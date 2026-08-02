import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { saveViewletState } from '../src/parts/SaveViewletState/SaveViewletState.ts'

test('saveViewletState saves a panel child under its stable viewlet id', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SaveState.saveViewletStateWithStorageId': async () => {},
  })

  await saveViewletState(12, 'Problems')

  expect(mockRpc.invocations).toEqual([['SaveState.saveViewletStateWithStorageId', 12, 'Problems']])
})

test('saveViewletState ignores an uninitialized panel child', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SaveState.saveViewletStateWithStorageId': async () => {},
  })

  await saveViewletState(0, '')

  expect(mockRpc.invocations).toEqual([])
})
