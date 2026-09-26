import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { openViewlet } from '../src/parts/OpenViewlet/OpenViewlet.ts'
import * as PendingDisposals from '../src/parts/PendingDisposals/PendingDisposals.ts'

test('openViewlet saves the active child before creating its replacement', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.createPanelViewlet': async () => {},
    'SaveState.saveViewletStateWithStorageId': async () => {},
    'Viewlet.dispose': async () => {},
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
  expect(mockRpc.invocations).toHaveLength(2)
  const { uid } = state
  expect(PendingDisposals.take(uid)).toEqual([12])
})

test('openViewlet does not dispose a missing active child', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.createPanelViewlet': async () => {},
  })
  const state = {
    ...createDefaultState(),
    views: ['Problems'],
  }

  await openViewlet(state, 'Problems')

  expect(mockRpc.invocations).toHaveLength(1)
  expect(mockRpc.invocations[0][0]).toBe('Layout.createPanelViewlet')
})

test('openViewlet ignores views that are not available', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.createPanelViewlet': async () => {},
    'SaveState.saveViewletStateWithStorageId': async () => {},
  })
  const state = {
    ...createDefaultState(),
    currentViewletId: 'Problems',
    views: ['Problems', 'Output'],
  }

  const result = await openViewlet(state, 'Ports')

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})
