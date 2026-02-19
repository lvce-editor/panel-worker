import type { SavedPanelState } from '../SavedPanelState/SavedPanelState.ts'
import * as ViewletModuleId from '../../ViewletModuleId/ViewletModuleId.ts'

export const getSavedViewletId = (savedState: SavedPanelState | undefined): string => {
  if (savedState && savedState.currentViewletId) {
    return savedState.currentViewletId || ViewletModuleId.Problems
  }
  return ViewletModuleId.Problems
}
