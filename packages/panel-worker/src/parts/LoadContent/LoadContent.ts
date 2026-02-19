import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { PanelState } from '../PanelState/PanelState.ts'
import * as Assert from '../Assert/Assert.ts'
import { createViewlet } from '../CreateViewlet/CreateViewlet.ts'
import * as GetPanelViews from '../GetPanelViews/GetPanelViews.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

type ViewletId = string

interface SavedPanelState {
  readonly currentViewletId?: ViewletId
}

interface PanelDimensions {
  readonly height: number
  readonly width: number
  readonly x: number
  readonly y: number
}

const getSavedViewletId = (savedState: SavedPanelState | undefined): ViewletId => {
  if (savedState && savedState.currentViewletId) {
    return savedState.currentViewletId || ViewletModuleId.Problems
  }
  return ViewletModuleId.Problems
}

export const loadContent = (state: PanelState, savedState: SavedPanelState | undefined): Promise<PanelState> => {
  const savedViewletId = getSavedViewletId(savedState)
  const views = GetPanelViews.getPanelViews()
  const loaded = {
    ...state,
    currentViewletId: savedViewletId,
    views,
  }
  return openViewlet(loaded, savedViewletId)
}

export const setBadgeCount = (state: PanelState, id: string, count: number): PanelState => {
  const { badgeCounts } = state
  return {
    ...state,
    badgeCounts: {
      ...badgeCounts,
      [id]: count,
    },
  }
}

// export const contentLoaded = (state) => {
//   const commands = []
//   return commands
// }

const getContentDimensions = (dimensions: PanelState): PanelDimensions => {
  return {
    height: dimensions.height - 35,
    width: dimensions.width,
    x: dimensions.x,
    y: dimensions.y + 35,
  }
}

// TODO
// export const getChildren = (state) => {
//   const { currentViewletId } = state
//   return [
//     {
//       id: currentViewletId,
//       ...getContentDimensions(state),
//     },
//   ]
// }

export const dispose = (state: PanelState): PanelState => {
  return {
    ...state,
    disposed: true,
  }
}

export const openViewlet = async (state: PanelState, id: string, focus = false): Promise<PanelState> => {
  const childDimensions = getContentDimensions(state)
  const childUid = Math.random()
  const tabId = 1234
  // TODO get the actions uid somehow
  const actionsUid = Math.random()
  await createViewlet(id, childUid, tabId, childDimensions, '')
  return { ...state, actionsUid, childUid, currentViewletId: id }
}

export const hidePanel = async (state: PanelState): Promise<PanelState> => {
  await RendererWorker.invoke('Layout.hidePanel')
  return state
}

export const handleClickClose = async (state: PanelState): Promise<PanelState> => {
  await RendererWorker.invoke('Layout.hidePanel')
  return state
}

export const handleClickMaximize = async (state: PanelState): Promise<PanelState> => {
  // TODO
  return state
}

export const selectIndex = async (state: PanelState, index: number): Promise<PanelState> => {
  await openViewlet(state, state.views[index])
  return {
    ...state,
    selectedIndex: index,
  }
}

export const selectRaw = async (state: PanelState, rawIndex: string): Promise<PanelState> => {
  return selectIndex(state, Number.parseInt(rawIndex, 10))
}

export const selectView = async (state: PanelState, name: ViewletId): Promise<PanelState> => {
  const index = state.views.indexOf(name)
  if (index === -1) {
    return state
  }
  return selectIndex(state, index)
}

export const toggleView = async (state: PanelState, name: ViewletId): Promise<PanelState> => {
  const index = state.views.indexOf(name)
  if (index === -1) {
    return state
  }
  if (name === state.currentViewletId) {
    // await Command.execute('Layout.hidePanel') // TODO
    return state
  }
  return selectIndex(state, index)
}

export const handleFilterInput = async (state: PanelState, value: string): Promise<PanelState> => {
  Assert.object(state)
  Assert.string(value)
  const { currentViewletId } = state
  const fullCommand = `${currentViewletId}.handleFilterInput`
  await RendererWorker.invoke(fullCommand, value)
  return state
}
