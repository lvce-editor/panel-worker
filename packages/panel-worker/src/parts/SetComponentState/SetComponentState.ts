import type { PanelState } from '../PanelState/PanelState.ts'
import * as PanelStates from '../PanelStates/PanelStates.ts'

const applyComponentState = (currentState: PanelState, state: PanelState): PanelState => {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    throw new TypeError('Panel state must be an object')
  }
  const { uid } = state
  const { uid: currentUid } = currentState
  if (uid !== currentUid) {
    throw new Error(`Panel state uid must remain ${currentUid}`)
  }
  return state
}

export const setComponentState = PanelStates.wrapCommand(applyComponentState)
