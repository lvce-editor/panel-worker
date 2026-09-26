import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandlePanelLayoutChanged from '../src/parts/HandlePanelLayoutChanged/HandlePanelLayoutChanged.ts'

test('handlePanelLayoutChanged updates maximized', () => {
  const state = createDefaultState()

  const result = HandlePanelLayoutChanged.handlePanelLayoutChanged(state, { maximized: true })

  expect(result).toEqual({
    ...state,
    maximized: true,
  })
  expect(result).not.toBe(state)
})

test('handlePanelLayoutChanged returns unchanged state when maximized is unchanged', () => {
  const state = {
    ...createDefaultState(),
    maximized: true,
  }

  const result = HandlePanelLayoutChanged.handlePanelLayoutChanged(state, { maximized: true })

  expect(result).toBe(state)
})
