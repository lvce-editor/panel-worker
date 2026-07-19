import type { PanelState } from '../PanelState/PanelState.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'

export const toggleView = async (state: PanelState, name: string): Promise<PanelState> => {
  const { currentViewletId, views } = state
  const index = views.indexOf(name)
  if (index === -1) {
    return state
  }
  if (name === currentViewletId) {
    return state
  }
  return SelectIndex.selectIndex(state, index)
}
