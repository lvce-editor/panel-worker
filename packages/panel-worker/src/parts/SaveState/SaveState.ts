import type { PanelState } from '../PanelState/PanelState.ts'
import type { SavedState } from '../SavedState/SavedState.ts'
import * as SaveViewletState from '../SaveViewletState/SaveViewletState.ts'

export const saveState = async (state: PanelState): Promise<SavedState> => {
  const { childUid, currentViewletId, hiddenViews } = state
  await SaveViewletState.saveViewletState(childUid, currentViewletId)
  return {
    currentViewletId,
    hiddenViews,
  }
}
