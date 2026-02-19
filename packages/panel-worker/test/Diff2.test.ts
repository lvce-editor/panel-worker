import { expect, test } from '@jest/globals'
import type { PanelState } from '../src/parts/PanelState/PanelState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Diff2 from '../src/parts/Diff2/Diff2.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as PanelStates from '../src/parts/PanelStates/PanelStates.ts'

test('diff2 should return empty diff when relevant state is unchanged', () => {
  const uid = 1001
  const views = ['PROBLEMS']
  const oldState: PanelState = {
    ...createDefaultState(),
    actionsUid: 0,
    assetDir: '/same-dir',
    badgeCounts: {},
    childUid: 0,
    currentViewletId: '',
    errorCount: 0,
    height: 200,
    initial: false,
    platform: 0,
    selectedIndex: 0,
    uid,
    views,
    warningCount: 0,
    width: 300,
    x: 0,
    y: 0,
  }
  const newState: PanelState = {
    ...createDefaultState(),
    actionsUid: 0,
    assetDir: '/same-dir',
    badgeCounts: {},
    childUid: 0,
    currentViewletId: '',
    errorCount: 0,
    height: 200,
    initial: false,
    platform: 0,
    selectedIndex: 0,
    uid,
    views,
    warningCount: 0,
    width: 300,
    x: 0,
    y: 0,
  }
  PanelStates.set(uid, newState, oldState)

  const result = Diff2.diff2(uid)

  expect(result).toEqual([])
})

test('diff2 should return RenderIncremental diff when assetDir changes', () => {
  const uid = 1002
  const oldState: PanelState = {
    ...createDefaultState(),
    actionsUid: 0,
    assetDir: '/old-dir',
    badgeCounts: {},
    childUid: 0,
    currentViewletId: '',
    errorCount: 0,
    height: 200,
    initial: false,
    platform: 0,
    selectedIndex: 0,
    uid,
    views: ['PROBLEMS'],
    warningCount: 0,
    width: 300,
    x: 0,
    y: 0,
  }
  const newState: PanelState = {
    ...createDefaultState(),
    actionsUid: 0,
    assetDir: '/new-dir',
    badgeCounts: {},
    childUid: 0,
    currentViewletId: '',
    errorCount: 0,
    height: 200,
    initial: false,
    platform: 0,
    selectedIndex: 0,
    uid,
    views: ['PROBLEMS'],
    warningCount: 0,
    width: 300,
    x: 0,
    y: 0,
  }
  PanelStates.set(uid, newState, oldState)

  const result = Diff2.diff2(uid)

  expect(result).toEqual([DiffType.RenderIncremental])
})
