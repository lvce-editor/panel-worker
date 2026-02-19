import type { PanelState } from '../../PanelState/PanelState.ts'
import { selectIndex } from '../LoadContent.ts'

export const selectName = async (state: PanelState, name: string): Promise<PanelState> => {
  if (!name) {
    return state
  }
  const index = state.views.indexOf(name)
  if (index === -1) {
    return state
  }
  return selectIndex(state, index)
}
