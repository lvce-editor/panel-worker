import type { PanelState } from '../PanelState/PanelState.ts'

export const saveState = (state: PanelState): any => {
  const { currentViewletId } = state
  return {
    currentViewletId,
  }
}
