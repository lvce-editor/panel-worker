import type { PanelState } from '../PanelState/PanelState.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'

export const toggleView = async (state: PanelState, name: string, uri = ''): Promise<PanelState> => {
  const { availableViews, currentViewletId, hiddenViews, views } = state
  if (!availableViews.includes(name)) {
    return state
  }
  if (!views.includes(name)) {
    const nextHiddenViews = hiddenViews.filter((view) => view !== name)
    const nextViews = availableViews.filter((view) => !nextHiddenViews.includes(view))
    return SelectIndex.selectIndex(
      {
        ...state,
        hiddenViews: nextHiddenViews,
        views: nextViews,
      },
      nextViews.indexOf(name),
      uri,
    )
  }
  const index = views.indexOf(name)
  if (name === currentViewletId) {
    return state
  }
  return SelectIndex.selectIndex(state, index, uri)
}
