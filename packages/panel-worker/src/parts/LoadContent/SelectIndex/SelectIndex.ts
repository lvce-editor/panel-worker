import type { PanelState } from '../../PanelState/PanelState.ts'
import * as OpenViewlet from '../OpenViewlet/OpenViewlet.ts'

export const selectIndex = async (state: PanelState, index: number): Promise<PanelState> => {
  await OpenViewlet.openViewlet(state, state.views[index])
  return {
    ...state,
    selectedIndex: index,
  }
}
