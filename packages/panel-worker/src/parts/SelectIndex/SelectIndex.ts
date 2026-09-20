import type { PanelState } from '../PanelState/PanelState.ts'
import * as OpenViewlet from '../OpenViewlet/OpenViewlet.ts'

export const selectIndex = async (state: PanelState, index: number, uri = ''): Promise<PanelState> => {
  const { views } = state
  if (index < 0 || index >= views.length) {
    return state
  }
  return OpenViewlet.openViewlet(state, views[index], true, uri)
}
