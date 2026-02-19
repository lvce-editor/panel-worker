import type { PanelState } from '../../PanelState/PanelState.ts'
import type { SavedPanelState } from '../SavedPanelState/SavedPanelState.ts'
import * as GetPanelViews from '../../GetPanelViews/GetPanelViews.ts'
import * as GetSavedViewletId from '../GetSavedViewletId/GetSavedViewletId.ts'
import * as OpenViewlet from '../OpenViewlet/OpenViewlet.ts'

export const loadContent = (state: PanelState, savedState: SavedPanelState | undefined): Promise<PanelState> => {
  const savedViewletId = GetSavedViewletId.getSavedViewletId(savedState)
  const views = GetPanelViews.getPanelViews()
  const loaded = {
    ...state,
    currentViewletId: savedViewletId,
    views,
  }
  return OpenViewlet.openViewlet(loaded, savedViewletId)
}
