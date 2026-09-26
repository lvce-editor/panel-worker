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
  expect(newStateTyped.headerHeight).toBe(35)
  expect(newStateTyped.maximized).toBe(false)
  expect(oldStateTyped).toBeDefined()
  expect(oldStateTyped.uid).toBe(uid)
  expect(oldStateTyped.headerHeight).toBe(35)
  expect(oldStateTyped.maximized).toBe(false)
})

test('create should store the initial panel bounds', () => {
  const uid = 124
  Create.create(uid, '', 10, 20, 300, 400, 0, '')
  const { newState, oldState } = PanelStates.get(uid)
  expect(newState).toMatchObject({
    height: 400,
    width: 300,
    x: 10,
    y: 20,
  })
  expect(oldState).toMatchObject({
    height: 400,
    width: 300,
    x: 10,
    y: 20,
  })
})
