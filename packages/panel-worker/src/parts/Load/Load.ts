import type { PanelState } from '../PanelState/PanelState.ts'
import type { SavedPanelState } from '../SavedPanelState/SavedPanelState.ts'
import * as GetPanelViews from '../GetPanelViews/GetPanelViews.ts'
import * as GetSavedViewletId from '../GetSavedViewletId/GetSavedViewletId.ts'
import * as OpenViewlet from '../OpenViewlet/OpenViewlet.ts'

export const loadContent = (state: PanelState, savedState: SavedPanelState | undefined, workspaceUri = ''): Promise<PanelState> => {
  const { currentViewletId: activeViewletId } = state
  const savedViewletId = GetSavedViewletId.getSavedViewletId(savedState)
  const views = GetPanelViews.getPanelViews(workspaceUri)
  let currentViewletId = savedViewletId
  if (!views.includes(currentViewletId)) {
    currentViewletId = views.includes(activeViewletId) ? activeViewletId : views[0]
  }
  const loaded = {
    ...state,
    currentViewletId,
    views,
  }
  return OpenViewlet.openViewlet(loaded, currentViewletId)
}
