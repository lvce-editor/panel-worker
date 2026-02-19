import type { PanelState } from '../PanelState/PanelState.ts'

export const renderChildUid = (oldState: PanelState, newState: PanelState): readonly any[] => {
  const oldChildUid = oldState.childUid
  console.log({ newChild: newState.childUid, oldChildUid })
  if (oldChildUid <= 0 || oldChildUid === newState.childUid) {
    return []
  }
  return ['Viewlet.dispose', oldChildUid]
}
