import type { PanelState } from '../PanelState/PanelState.ts'

interface PanelLayoutChange {
  readonly maximized: boolean
}

export const handlePanelLayoutChanged = (state: PanelState, change: PanelLayoutChange): PanelState => {
  const { maximized } = change
  if (state.maximized === maximized) {
    return state
  }
  return {
    ...state,
    maximized,
  }
}
