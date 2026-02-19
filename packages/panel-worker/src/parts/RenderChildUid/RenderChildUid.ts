import type { PanelState } from '../PanelState/PanelState.ts'

// TODO also need to dispose child when panel becomes hidden
export const renderChildUid = (oldState: PanelState, newState: PanelState): readonly any[] => {
  const oldChildUid = oldState.childUid
  if (oldChildUid <= 0 || oldChildUid === newState.childUid) {
    return []
  }
  return ['Viewlet.dispose', oldChildUid]
}
