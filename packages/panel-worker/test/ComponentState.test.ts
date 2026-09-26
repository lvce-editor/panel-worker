import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getComponentState } from '../src/parts/GetComponentState/GetComponentState.ts'
import * as PanelStates from '../src/parts/PanelStates/PanelStates.ts'
import { setComponentState } from '../src/parts/SetComponentState/SetComponentState.ts'

test('gets and sets the live component state', async () => {
  const uid = 101
  const oldState = { ...createDefaultState(), uid }
  const newState = { ...oldState, views: ['Live Problems'] }
  PanelStates.set(uid, oldState, oldState)

  expect(getComponentState(uid)).toBe(oldState)
  await setComponentState(uid, newState)

  expect(PanelStates.get(uid)).toEqual({ newState, oldState, scheduledState: newState })
})

test('rejects invalid live component state', async () => {
  const uid = 102
  const state = { ...createDefaultState(), uid }
  PanelStates.set(uid, state, state)

  await expect(setComponentState(uid, { ...state, uid: 103 })).rejects.toThrow('Panel state uid must remain 102')
  await expect(setComponentState(uid, [])).rejects.toThrow('Panel state must be an object')
})
