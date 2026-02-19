import { expect, test } from '@jest/globals'
import type { PanelState } from '../src/parts/PanelState/PanelState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { saveState } from '../src/parts/SaveState/SaveState.ts'

const createState = (overrides: Partial<PanelState> = {}): PanelState => {
  return {
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
    ...overrides,
  }
}

test('saveState should return persisted state with currentViewletId', () => {
  const state = createState({
    currentViewletId: 'Output',
  })

  const result = saveState(state)

  expect(result).toEqual({
    currentViewletId: 'Output',
  })
})

test('saveState should not include unrelated state properties', () => {
  const state = createState()

  const result = saveState(state)

  expect(result).not.toHaveProperty('uid')
  expect(result).not.toHaveProperty('views')
  expect(result).not.toHaveProperty('selectedIndex')
  expect(result).not.toHaveProperty('x')
  expect(result).not.toHaveProperty('y')
})

test('saveState should preserve empty currentViewletId value', () => {
  const state = createState({
    currentViewletId: '',
  })

  const result = saveState(state)

  expect(result).toEqual({
    currentViewletId: '',
  })
})
