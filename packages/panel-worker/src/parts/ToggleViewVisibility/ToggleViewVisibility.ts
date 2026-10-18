import type { PanelState } from '../PanelState/PanelState.ts'
import * as OpenViewlet from '../OpenViewlet/OpenViewlet.ts'

export const toggleViewVisibility = async (state: PanelState, name: string): Promise<PanelState> => {
  const { availableViews, currentViewletId, hiddenViews, views } = state
  if (availableViews.every((view) => view.id !== name)) {
    return state
  }

  if (views.every((view) => view.id !== name)) {
    const nextHiddenViews = hiddenViews.filter((view) => view !== name)
    const nextViews = availableViews.filter((view) => !nextHiddenViews.includes(view.id))
    const nextState = {
      ...state,
      hiddenViews: nextHiddenViews,
      selectedIndex: nextViews.findIndex((view) => view.id === currentViewletId),
      views: nextViews,
    }
    if (views.length === 0) {
      return OpenViewlet.openViewlet(nextState, name)
    }
    return nextState
  }

  if (views.length <= 1) {
    return state
  }

  const nextViews = views.filter((view) => view.id !== name)
  const nextHiddenViews = availableViews.filter((view) => nextViews.every((visibleView) => visibleView.id !== view.id)).map((view) => view.id)
  const nextState = {
    ...state,
    hiddenViews: nextHiddenViews,
    selectedIndex: nextViews.findIndex((view) => view.id === currentViewletId),
    views: nextViews,
  }
  if (currentViewletId !== name) {
    return nextState
  }

  const index = views.findIndex((view) => view.id === name)
  const nextView = nextViews[Math.min(index, nextViews.length - 1)]
  return OpenViewlet.openViewlet(nextState, nextView.id)
}
