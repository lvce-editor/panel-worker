import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { PanelState } from '../src/parts/PanelState/PanelState.ts'
import * as Resize from '../src/parts/Resize/Resize.ts'

const createState = (overrides: Partial<PanelState> = {}): PanelState => {
  return {
    actionsUid: 1,
    assetDir: '/assets',
    badgeCounts: {},
    childUid: 42,
    currentViewletId: 'test-viewlet',
    errorCount: 0,
    height: 200,
    initial: false,
    platform: 0,
    selectedIndex: 0,
    uid: 1,
    views: ['PROBLEMS'],
    warningCount: 0,
    width: 300,
    x: 10,
    y: 20,
    ...overrides,
  }
}

test('resize should merge dimensions into state and call Viewlet.resize', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.resize': async () => {
      return []
    },
  })
  const state = createState({ childUid: 7, height: 100, width: 100 })
  const dimensions = { height: 480, width: 640 }

  const result = await Resize.resize(state, dimensions)

  expect(result).toEqual({
    ...state,
    ...dimensions,
  })
  expect(result).not.toBe(state)
  expect(mockRpc.invocations).toEqual([['Viewlet.resize', 7, dimensions]])
})

test('resize should keep unrelated fields unchanged', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.resize': async () => {
      return []
    },
  })
  const state = createState({
    childUid: 5,
    currentViewletId: 'abc',
    selectedIndex: 2,
    views: ['PROBLEMS', 'OUTPUT'],
  })
  const dimensions = { x: 50, y: 75 }

  const result = await Resize.resize(state, dimensions)

  expect(result.currentViewletId).toBe('abc')
  expect(result.selectedIndex).toBe(2)
  expect(result.views).toEqual(['PROBLEMS', 'OUTPUT'])
  expect(result.x).toBe(50)
  expect(result.y).toBe(75)
  expect(mockRpc.invocations).toEqual([['Viewlet.resize', 5, dimensions]])
})
