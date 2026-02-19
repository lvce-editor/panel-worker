import type { PanelState } from '../PanelState/PanelState.ts'
import * as OpenViewlet from '../OpenViewlet/OpenViewlet.ts'

export const selectIndex = async (state: PanelState, index: number): Promise<PanelState> => {
  const { views } = state
  return OpenViewlet.openViewlet(state, views[index])
}
