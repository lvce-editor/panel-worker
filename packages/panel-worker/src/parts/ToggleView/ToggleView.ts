import type { PanelState } from '../PanelState/PanelState.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'

export const toggleView = async (state: PanelState, name: string, uri = ''): Promise<PanelState> => {
  const { availableViews, currentViewletId, hiddenViews, views } = state
  if (availableViews.every((view) => view.id !== name)) {
    return state
  }
  if (views.every((view) => view.id !== name)) {
    const nextHiddenViews = hiddenViews.filter((view) => view !== name)
    const nextViews = availableViews.filter((view) => !nextHiddenViews.includes(view.id))
    return SelectIndex.selectIndex(
      {
        ...state,
        hiddenViews: nextHiddenViews,
        views: nextViews,
      },
      nextViews.findIndex((view) => view.id === name),
      uri,
    )
  }
  const index = views.findIndex((view) => view.id === name)
  if (name === currentViewletId) {
    return state
  }
  return SelectIndex.selectIndex(state, index, uri)
}
