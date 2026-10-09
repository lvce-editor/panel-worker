import type { PanelState } from '../PanelState/PanelState.ts'
import type { SavedPanelState } from '../SavedPanelState/SavedPanelState.ts'
import * as GetPanelViews from '../GetPanelViews/GetPanelViews.ts'
import * as GetSavedViewletId from '../GetSavedViewletId/GetSavedViewletId.ts'
import * as OpenViewlet from '../OpenViewlet/OpenViewlet.ts'

export const loadContent = (state: PanelState, savedState: SavedPanelState | undefined, workspaceUri = ''): Promise<PanelState> => {
  const { currentViewletId: activeViewletId } = state
  const savedViewletId = savedState?.currentViewletId || activeViewletId || GetSavedViewletId.getSavedViewletId(savedState)
  const availableViews = GetPanelViews.getPanelViews(workspaceUri)
  const hiddenViews = (savedState?.hiddenViews || state.hiddenViews || []).filter((view) => availableViews.includes(view))
  let views = availableViews.filter((view) => !hiddenViews.includes(view))
  if (views.length === 0 && availableViews.length > 0) {
    views = [availableViews[0]]
  }
  let currentViewletId = savedViewletId
  if (!views.includes(currentViewletId)) {
    currentViewletId = views.includes(activeViewletId) ? activeViewletId : views[0]
  }
  const loaded = {
    ...state,
    availableViews,
    currentViewletId,
    hiddenViews: availableViews.filter((view) => !views.includes(view)),
    views,
  }
  return OpenViewlet.openViewlet(loaded, currentViewletId)
}
