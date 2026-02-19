import type { PanelState } from '../PanelState/PanelState.ts'
import type { SavedState } from '../SavedState/SavedState.ts'

export const saveState = (state: PanelState): SavedState => {
  const { currentViewletId } = state
  return {
    currentViewletId,
  }
}
