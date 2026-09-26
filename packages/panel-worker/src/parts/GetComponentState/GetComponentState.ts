import type { PanelState } from '../PanelState/PanelState.ts'
import * as PanelStates from '../PanelStates/PanelStates.ts'

export const getComponentState = (uid: number): PanelState => {
  return PanelStates.get(uid).newState
}
