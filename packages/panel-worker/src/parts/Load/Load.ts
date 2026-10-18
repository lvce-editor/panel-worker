import type { PanelState } from '../PanelState/PanelState.ts'
import type { SavedPanelState } from '../SavedPanelState/SavedPanelState.ts'
import * as GetPanelViews from '../GetPanelViews/GetPanelViews.ts'
import * as GetSavedViewletId from '../GetSavedViewletId/GetSavedViewletId.ts'
import * as OpenViewlet from '../OpenViewlet/OpenViewlet.ts'

export const loadContent = (state: PanelState, savedState: SavedPanelState | undefined, workspaceUri = ''): Promise<PanelState> => {
  const { currentViewletId: activeViewletId, hiddenViews: activeHiddenViews, platform } = state
  const savedViewletId = savedState?.currentViewletId || activeViewletId || GetSavedViewletId.getSavedViewletId(savedState)
  const availableViews = GetPanelViews.getPanelViews(workspaceUri, platform)
  const availableViewIds = availableViews.map((view) => view.id)
  const hiddenViews = (savedState?.hiddenViews || activeHiddenViews || []).filter((view) => availableViewIds.includes(view))
  let views = availableViews.filter((view) => !hiddenViews.includes(view.id))
  if (views.length === 0 && availableViews.length > 0) {
    views = [availableViews[0]]
  }
  let currentViewletId = savedViewletId
  if (views.every((view) => view.id !== currentViewletId)) {
    currentViewletId = views.some((view) => view.id === activeViewletId) ? activeViewletId : views[0]?.id
  }
  const loaded = {
    ...state,
    availableViews,
    currentViewletId,
    hiddenViews: availableViews.filter((view) => views.every((visibleView) => visibleView.id !== view.id)).map((view) => view.id),
    views,
  }
  return OpenViewlet.openViewlet(loaded, currentViewletId)
}
