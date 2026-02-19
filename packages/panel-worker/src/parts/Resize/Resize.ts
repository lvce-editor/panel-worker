import type { PanelState } from '../PanelState/PanelState.ts'

export const resize = (state: PanelState, dimensions: any): PanelState => {
  return {
    ...state,
    ...dimensions,
  }
}
