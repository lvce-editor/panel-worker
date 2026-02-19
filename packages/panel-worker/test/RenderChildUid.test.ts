import { expect, test } from '@jest/globals'
import type { PanelState } from '../src/parts/PanelState/PanelState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderChildUid } from '../src/parts/RenderChildUid/RenderChildUid.ts'

test('renderChildUid should return dispose command for old child uid when childUid changes', () => {
  const oldState: PanelState = {
    ...createDefaultState(),
    childUid: 5,
    initial: false,
  }
  const newState: PanelState = {
    ...createDefaultState(),
    childUid: 9,
    initial: false,
  }

  const result = renderChildUid(oldState, newState)

  expect(result).toEqual(['Viewlet.dispose', 5])
})

test('renderChildUid should return empty array when childUid is unchanged', () => {
  const oldState: PanelState = {
    ...createDefaultState(),
    childUid: 5,
    initial: false,
  }
  const newState: PanelState = {
    ...createDefaultState(),
    childUid: 5,
    initial: false,
  }

  const result = renderChildUid(oldState, newState)

  expect(result).toEqual([])
})

test('renderChildUid should return empty array when old child uid is not a mounted viewlet', () => {
  const oldState: PanelState = {
    ...createDefaultState(),
    childUid: 0,
    initial: false,
  }
  const newState: PanelState = {
    ...createDefaultState(),
    childUid: 8,
    initial: false,
  }

  const result = renderChildUid(oldState, newState)

  expect(result).toEqual([])
})
