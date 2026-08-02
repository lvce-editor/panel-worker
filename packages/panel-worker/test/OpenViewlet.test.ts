import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { openViewlet } from '../src/parts/OpenViewlet/OpenViewlet.ts'

test('openViewlet saves the active child before creating its replacement', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.createPanelViewlet': async () => {},
    'SaveState.saveViewletStateWithStorageId': async () => {},
  })
  const random = jest.spyOn(Math, 'random').mockReturnValue(42)
  const state = {
    ...createDefaultState(),
    childUid: 12,
    currentViewletId: 'Problems',
    height: 200,
    views: ['Problems', 'Output'],
    width: 300,
  }

  try {
    await openViewlet(state, 'Output')
  } finally {
    random.mockRestore()
  }

  expect(mockRpc.invocations[0]).toEqual(['SaveState.saveViewletStateWithStorageId', 12, 'Problems'])
  expect(mockRpc.invocations[1][0]).toBe('Layout.createPanelViewlet')
  expect(mockRpc.invocations[1][1]).toBe('Output')
})
