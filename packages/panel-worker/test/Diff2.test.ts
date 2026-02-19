import { expect, test } from '@jest/globals'
import type { PanelState } from '../src/parts/PanelState/PanelState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Diff2 from '../src/parts/Diff2/Diff2.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as PanelStates from '../src/parts/PanelStates/PanelStates.ts'

const createState = (overrides: Partial<PanelState> = {}): PanelState => {
  return {
    ...createDefaultState(),
    actionsUid: 0,
    assetDir: '/asset-dir',
    badgeCounts: {},
    childUid: 0,
    currentViewletId: '',
    errorCount: 0,
    height: 200,
    initial: false,
    platform: 0,
    selectedIndex: 0,
    uid: 1,
    views: ['PROBLEMS'],
    warningCount: 0,
    width: 300,
    x: 0,
    y: 0,
    ...overrides,
  }
}

test('diff2 should return empty diff when relevant state is unchanged', () => {
  const uid = 1001
  const oldState = createState({ assetDir: '/same-dir', uid })
  const newState = createState({ assetDir: '/same-dir', uid })
  PanelStates.set(uid, newState, oldState)

  const result = Diff2.diff2(uid)

  expect(result).toEqual([])
})

test('diff2 should return RenderIncremental diff when assetDir changes', () => {
  const uid = 1002
  const oldState = createState({ assetDir: '/old-dir', uid })
  const newState = createState({ assetDir: '/new-dir', uid })
  PanelStates.set(uid, newState, oldState)

  const result = Diff2.diff2(uid)

  expect(result).toEqual([DiffType.RenderIncremental])
})
