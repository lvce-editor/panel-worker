import type { PanelState } from '../PanelState/PanelState.ts'

export const getCurrentViewletId = (state: PanelState): string => {
  const { currentViewletId } = state
  return currentViewletId
}
