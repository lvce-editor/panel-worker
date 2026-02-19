import type { PanelState } from '../PanelState/PanelState.ts'

export const loadContent = async (state: PanelState): Promise<PanelState> => {
  return {
    ...state,
    errorCount: 0,
    initial: false,
    warningCount: 0,
  }
}
