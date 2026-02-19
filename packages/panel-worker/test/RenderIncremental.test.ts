import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { PanelState } from '../src/parts/PanelState/PanelState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderIncremental } from '../src/parts/RenderIncremental/RenderIncremental.ts'

const createState = (overrides: Partial<PanelState> = {}): PanelState => {
  return {
    ...createDefaultState(),
    actionsUid: 0,
    assetDir: '',
    badgeCounts: {
      PROBLEMS: 3,
    },
    childUid: 7,
    initial: false,
    platform: 0,
    selectedIndex: 0,
    uid: 1,
    views: ['PROBLEMS', 'OUTPUT'],
    ...overrides,
  }
}

test('renderIncremental should return SetPatches command with empty patches when dom is unchanged', () => {
  const state = createState()

  const result = renderIncremental(state, state)

  expect(result).toEqual([ViewletCommand.SetPatches, 1, []])
})

test('renderIncremental should return patches when tab selection changes', () => {
  const oldState = createState({ selectedIndex: 0 })
  const newState = createState({ selectedIndex: 1 })

  const result = renderIncremental(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetPatches)
  expect(result[1]).toBe(1)
  expect(Array.isArray(result[2])).toBe(true)
  expect(result[2].length).toBeGreaterThan(0)
})

test('renderIncremental should use uid from new state', () => {
  const oldState = createState({ selectedIndex: 0, uid: 1 })
  const newState = createState({ selectedIndex: 1, uid: 99 })

  const result = renderIncremental(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetPatches)
  expect(result[1]).toBe(99)
})
