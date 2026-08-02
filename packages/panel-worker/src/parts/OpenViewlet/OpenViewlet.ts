import type { PanelState } from '../PanelState/PanelState.ts'
import { createViewlet } from '../CreateViewlet/CreateViewlet.ts'
import * as GetContentDimensions from '../GetContentDimensions/GetContentDimensions.ts'
import * as GetUid from '../GetUid/GetUid.ts'
import * as SaveViewletState from '../SaveViewletState/SaveViewletState.ts'

export const openViewlet = async (state: PanelState, id: string, focus = false, uri = ''): Promise<PanelState> => {
  const { childUid: currentChildUid, currentViewletId, views } = state
  await SaveViewletState.saveViewletState(currentChildUid, currentViewletId)
  const childDimensions = GetContentDimensions.getContentDimensions(state)
  const childUid = GetUid.getUid()
  const tabId = GetUid.getUid()
  const actionsUid = GetUid.getUid()
  const index = views.indexOf(id)
  await createViewlet(id, childUid, tabId, actionsUid, childDimensions, uri, focus)
  return {
    ...state,
    actionsUid,
    childUid,
    currentViewletId: id,
    initial: false,
    selectedIndex: index,
  }
}
