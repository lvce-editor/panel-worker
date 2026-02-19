import type { PanelState } from '../PanelState/PanelState.ts'
import { createViewlet } from '../CreateViewlet/CreateViewlet.ts'
import * as GetContentDimensions from '../GetContentDimensions/GetContentDimensions.ts'

export const openViewlet = async (state: PanelState, id: string, focus = false): Promise<PanelState> => {
  const childDimensions = GetContentDimensions.getContentDimensions(state)
  const childUid = Math.random()
  const tabId = Math.random()
  const actionsUid = Math.random()
  const index = state.views.indexOf(id)
  await createViewlet(id, childUid, tabId, childDimensions, '')
  return {
    ...state,
    actionsUid,
    childUid,
    currentViewletId: id,
    initial: false,
    selectedIndex: index,
  }
}
