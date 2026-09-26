import type { PanelState } from '../PanelState/PanelState.ts'
import * as OpenViewlet from '../OpenViewlet/OpenViewlet.ts'

export const toggleViewVisibility = async (state: PanelState, name: string): Promise<PanelState> => {
  const { availableViews, currentViewletId, hiddenViews, views } = state
  if (!availableViews.includes(name)) {
    return state
  }

  if (!views.includes(name)) {
    const nextHiddenViews = hiddenViews.filter((view) => view !== name)
    const nextViews = availableViews.filter((view) => !nextHiddenViews.includes(view))
    const nextState = {
      ...state,
      hiddenViews: nextHiddenViews,
      selectedIndex: nextViews.indexOf(currentViewletId),
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

  const nextViews = views.filter((view) => view !== name)
  const nextHiddenViews = availableViews.filter((view) => !nextViews.includes(view))
  const nextState = {
    ...state,
    hiddenViews: nextHiddenViews,
    selectedIndex: nextViews.indexOf(currentViewletId),
    views: nextViews,
  }
  if (currentViewletId !== name) {
    return nextState
  }

  const index = views.indexOf(name)
  const nextView = nextViews[Math.min(index, nextViews.length - 1)]
  return OpenViewlet.openViewlet(nextState, nextView)
}
