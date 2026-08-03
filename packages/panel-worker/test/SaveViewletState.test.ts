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

test('saveViewletState supports renderers without the save command', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})

  await expect(saveViewletState(12, 'Problems')).resolves.toBeUndefined()

  expect(mockRpc.invocations).toEqual([['SaveState.saveViewletStateWithStorageId', 12, 'Problems']])
})

test('saveViewletState propagates other renderer failures', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SaveState.saveViewletStateWithStorageId': async () => {
      throw new Error('storage unavailable')
    },
  })

  await expect(saveViewletState(12, 'Problems')).rejects.toThrow('storage unavailable')
  expect(mockRpc.invocations).toEqual([['SaveState.saveViewletStateWithStorageId', 12, 'Problems']])
})
