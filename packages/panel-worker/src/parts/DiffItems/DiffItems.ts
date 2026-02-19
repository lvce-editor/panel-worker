import type { PanelState } from '../PanelState/PanelState.ts'

export const isEqual = (oldState: PanelState, newState: PanelState): boolean => {
  return (
    oldState.assetDir === newState.assetDir &&
    oldState.initial === newState.initial &&
    oldState.currentViewletId === newState.currentViewletId &&
    oldState.selectedIndex === newState.selectedIndex &&
    oldState.views === newState.views &&
    oldState.childUid === newState.childUid &&
    oldState.actionsUid === newState.actionsUid
  )
}
