import type { PanelState } from '../PanelState/PanelState.ts'

export interface Renderer {
  (oldState: PanelState, newState: PanelState): readonly any[]
}
