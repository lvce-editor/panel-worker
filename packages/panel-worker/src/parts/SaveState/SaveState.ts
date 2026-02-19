import type { SavedState } from '../SavedState/SavedState.ts'
import type { PanelState } from '../PanelState/PanelState.ts'

export const saveState = (state: PanelState): SavedState => {
  const { statusBarItemsLeft, statusBarItemsRight } = state
  return {
    itemsLeft: statusBarItemsLeft,
    itemsRight: statusBarItemsRight,
  }
}
