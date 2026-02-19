import type { PanelState } from '../PanelState/PanelState.ts'

export const isEqual = (oldState: PanelState, newState: PanelState): boolean => {
  return oldState.statusBarItemsLeft === newState.statusBarItemsLeft && oldState.statusBarItemsRight === newState.statusBarItemsRight
}
