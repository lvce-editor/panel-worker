import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { selectName } from '../src/parts/SelectName/SelectName.ts'
import { createPanelView } from '../test-utils/PanelViewTestHelpers.ts'

test('selectName selects a view by ID when its name differs', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.createPanelViewlet': async () => {},
    'SaveState.saveViewletStateWithStorageId': async () => {},
  })
  const view = createPanelView('publisher.extension-view', 'Extension View', 'extension')
  const state = { ...createDefaultState(), views: [view] }

  const result = await selectName(state, 'publisher.extension-view')

  expect(result.currentViewletId).toBe('publisher.extension-view')
  expect(mockRpc.invocations).toContainEqual([
    'Layout.createPanelViewlet',
    'publisher.extension-view',
    expect.any(Number),
    expect.any(Number),
    expect.any(Number),
    expect.any(Object),
    '',
    true,
  ])
})
