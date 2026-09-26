import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleProblemsSummaryChange } from '../src/parts/HandleProblemsSummaryChange/HandleProblemsSummaryChange.ts'

test('sets the Problems badge to the current problem count', () => {
  const state = createDefaultState()
  const result = handleProblemsSummaryChange(state, {
    hasEditor: true,
    problemCount: 7,
  })
  expect(result.badgeCounts).toEqual({ Problems: 7 })
})

test('clears the Problems badge when there is no active editor', () => {
  const state = {
    ...createDefaultState(),
    badgeCounts: { Problems: 7 },
  }
  const result = handleProblemsSummaryChange(state, {
    hasEditor: false,
    problemCount: 7,
  })
  expect(result.badgeCounts).toEqual({ Problems: 0 })
})

test('returns the same state when the Problems badge is unchanged', () => {
  const state = {
    ...createDefaultState(),
    badgeCounts: { Problems: 7 },
  }
  const result = handleProblemsSummaryChange(state, {
    hasEditor: true,
    problemCount: 7,
  })
  expect(result).toBe(state)
})
