import type { PanelState } from '../PanelState/PanelState.ts'

interface PanelLayoutChange {
  readonly maximized: boolean
}

export const handlePanelLayoutChanged = (state: PanelState, change: PanelLayoutChange): PanelState => {
  const { maximized: currentMaximized } = state
  const { maximized } = change
  if (currentMaximized === maximized) {
    return state
  }
  return {
    ...state,
    maximized,
  }
}
