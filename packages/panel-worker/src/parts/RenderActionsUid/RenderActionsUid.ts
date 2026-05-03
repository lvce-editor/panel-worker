import type { PanelState } from '../PanelState/PanelState.ts'

export const renderActionsUid = (oldState: PanelState, newState: PanelState): readonly any[] => {
  const oldActionsUid = oldState.actionsUid
  if (oldActionsUid <= 0 || oldActionsUid === newState.actionsUid) {
    return []
  }
  return ['Viewlet.dispose', oldActionsUid]
}