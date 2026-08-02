import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { PanelState } from '../src/parts/PanelState/PanelState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'

test('saveState should return persisted state with currentViewletId', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SaveState.saveViewletStateWithStorageId': async () => {},
  })
  const state: PanelState = {
    ...createDefaultState(),
    actionsUid: 11,
    assetDir: '/asset-dir',
    badgeCounts: { PROBLEMS: 3 },
    childUid: 12,
    currentViewletId: 'Output',
    errorCount: 1,
    height: 200,
    initial: false,
    platform: 2,
    selectedIndex: 0,
    uid: 13,
    views: ['PROBLEMS', 'OUTPUT'],
    warningCount: 2,
    width: 300,
    x: 10,
    y: 20,
  }

  const result = await saveState(state)

  expect(result).toEqual({
    currentViewletId: 'Output',
  })
  expect(mockRpc.invocations).toEqual([['SaveState.saveViewletStateWithStorageId', 12, 'Output']])
})

test('saveState should not include unrelated state properties', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SaveState.saveViewletStateWithStorageId': async () => {},
  })
  const state: PanelState = {
    ...createDefaultState(),
    actionsUid: 11,
    assetDir: '/asset-dir',
    badgeCounts: { PROBLEMS: 3 },
    childUid: 12,
    currentViewletId: 'Problems',
    errorCount: 1,
    height: 200,
    initial: false,
    platform: 2,
    selectedIndex: 0,
    uid: 13,
    views: ['PROBLEMS', 'OUTPUT'],
    warningCount: 2,
    width: 300,
    x: 10,
    y: 20,
  }

  const result = await saveState(state)

  expect(result).not.toHaveProperty('uid')
  expect(result).not.toHaveProperty('views')
  expect(result).not.toHaveProperty('selectedIndex')
  expect(result).not.toHaveProperty('x')
  expect(result).not.toHaveProperty('y')
  expect(mockRpc.invocations).toEqual([['SaveState.saveViewletStateWithStorageId', 12, 'Problems']])
})

test('saveState should preserve empty currentViewletId value', async () => {
  const state: PanelState = {
    ...createDefaultState(),
    actionsUid: 11,
    assetDir: '/asset-dir',
    badgeCounts: { PROBLEMS: 3 },
    childUid: 12,
    currentViewletId: '',
    errorCount: 1,
    height: 200,
    initial: false,
    platform: 2,
    selectedIndex: 0,
    uid: 13,
    views: ['PROBLEMS', 'OUTPUT'],
    warningCount: 2,
    width: 300,
    x: 10,
    y: 20,
  }

  const result = await saveState(state)

  expect(result).toEqual({
    currentViewletId: '',
  })
})
