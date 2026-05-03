import { expect, test } from '@jest/globals'
import type { PanelState } from '../src/parts/PanelState/PanelState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderActionsUid } from '../src/parts/RenderActionsUid/RenderActionsUid.ts'

test('renderActionsUid should return dispose command for old actions uid when actionsUid changes', () => {
  const oldState: PanelState = {
    ...createDefaultState(),
    actionsUid: 5,
    initial: false,
  }
  const newState: PanelState = {
    ...createDefaultState(),
    actionsUid: 9,
    initial: false,
  }

  const result = renderActionsUid(oldState, newState)

  expect(result).toEqual(['Viewlet.dispose', 5])
})

test('renderActionsUid should return empty array when actionsUid is unchanged', () => {
  const oldState: PanelState = {
    ...createDefaultState(),
    actionsUid: 5,
    initial: false,
  }
  const newState: PanelState = {
    ...createDefaultState(),
    actionsUid: 5,
    initial: false,
  }

  const result = renderActionsUid(oldState, newState)

  expect(result).toEqual([])
})

test('renderActionsUid should return empty array when old actions uid is not a mounted viewlet', () => {
  const oldState: PanelState = {
    ...createDefaultState(),
    actionsUid: 0,
    initial: false,
  }
  const newState: PanelState = {
    ...createDefaultState(),
    actionsUid: 8,
    initial: false,
  }

  const result = renderActionsUid(oldState, newState)

  expect(result).toEqual([])
})