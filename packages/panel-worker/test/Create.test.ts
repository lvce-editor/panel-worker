import { expect, test } from '@jest/globals'
import type { PanelState } from '../src/parts/PanelState/PanelState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as PanelStates from '../src/parts/PanelStates/PanelStates.ts'

test('create should store state with the given uid', () => {
  const uid = 123
  Create.create(uid, '', 0, 0, 0, 0, 0, '')
  const result = PanelStates.get(uid)
  const { newState } = result
  const newStateTyped: PanelState = newState
  const { oldState } = result
  const oldStateTyped: PanelState = oldState
  expect(newStateTyped).toBeDefined()
  expect(newStateTyped.uid).toBe(uid)
  expect(newStateTyped.statusBarItemsLeft).toEqual([])
  expect(newStateTyped.statusBarItemsRight).toEqual([])
  expect(oldStateTyped).toBeDefined()
  expect(oldStateTyped.uid).toBe(uid)
})
