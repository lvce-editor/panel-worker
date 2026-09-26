import type { PanelState } from '../PanelState/PanelState.ts'

const areBadgeCountsEqual = (oldBadgeCounts: Readonly<Record<string, number>>, newBadgeCounts: Readonly<Record<string, number>>): boolean => {
  const oldKeys = Object.keys(oldBadgeCounts)
  const newKeys = Object.keys(newBadgeCounts)
  return oldKeys.length === newKeys.length && oldKeys.every((key) => oldBadgeCounts[key] === newBadgeCounts[key])
}

export const isEqual = (oldState: PanelState, newState: PanelState): boolean => {
  return (
    oldState.assetDir === newState.assetDir &&
    areBadgeCountsEqual(oldState.badgeCounts, newState.badgeCounts) &&
    oldState.initial === newState.initial &&
    oldState.currentViewletId === newState.currentViewletId &&
    oldState.maximized === newState.maximized &&
    oldState.selectedIndex === newState.selectedIndex &&
    oldState.views === newState.views &&
    oldState.childUid === newState.childUid &&
    oldState.actionsUid === newState.actionsUid
  )
}
