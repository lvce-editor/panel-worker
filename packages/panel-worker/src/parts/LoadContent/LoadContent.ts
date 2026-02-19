import type { PanelState } from '../PanelState/PanelState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as GetPanelViews from '../GetPanelViews/GetPanelViews.ts'
import * as Id from '../Id/Id.ts'
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

type ViewletCommand = readonly [string, ...(readonly unknown[])]

interface ViewletManagerOptions extends PanelDimensions {
  readonly append: boolean
  readonly args: readonly unknown[]
  readonly focus: boolean
  readonly getModule: unknown
  readonly id: ViewletId
  readonly parentUid: number
  readonly setBounds: boolean
  readonly shouldRenderEvents: boolean
  readonly show: boolean
  readonly type: number
  readonly uid: number
  readonly uri: string
}

declare const ViewletManager: {
  readonly load: (
    options: ViewletManagerOptions,
    preserveScrollPosition: boolean,
    preserveSelection: boolean,
  ) => Promise<ViewletCommand[] | undefined>
}

declare const ViewletModule: {
  readonly load: unknown
}

declare const RendererProcess: {
  readonly invoke: (method: string, commands: readonly ViewletCommand[]) => Promise<void>
}

declare const Command: {
  readonly execute: (command: string, ...args: readonly unknown[]) => Promise<void>
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

export const openViewlet = async (state: PanelState, id: ViewletId, focus = false): Promise<PanelState> => {
  const childDimensions = getContentDimensions(state)

  const { uid } = state

  const childUid = Id.create()

  const commands = await ViewletManager.load(
    {
      append: false,
      args: [],
      focus,
      getModule: ViewletModule.load,
      height: childDimensions.height,
      id,
      parentUid: uid,
      setBounds: false,
      shouldRenderEvents: false,
      show: false,
      type: 0,
      uid: childUid,
      // @ts-ignore
      uri: '',
      width: childDimensions.width,
      x: childDimensions.x,
      y: childDimensions.y,
    },
    false,
    true,
  )
  let actionsDom: readonly unknown[] = []
  let actionsUid = -1
  if (commands) {
    const actionsDomIndex = commands.findIndex((command) => command[2] === 'setActionsDom')
    if (actionsDomIndex !== -1) {
      const actionDomEntry = commands[actionsDomIndex]?.[3]
      if (Array.isArray(actionDomEntry)) {
        actionsDom = actionDomEntry
      }
      commands.splice(actionsDomIndex, 1)
    }
    const eventsIndex = commands.findIndex((command) => command[0] === 'Viewlet.registerEventListeners')
    const events = eventsIndex === -1 ? [] : commands[eventsIndex]?.[2]
    actionsUid = Id.create()
    commands.push(
      ['Viewlet.createFunctionalRoot', id, actionsUid, true],
      ['Viewlet.registerEventListeners', actionsUid, events],
      ['Viewlet.setDom2', actionsUid, actionsDom],
      ['Viewlet.setUid', actionsUid, childUid],
    )
    await RendererProcess.invoke('Viewlet.sendMultiple', commands)
  }
  return { ...state, actionsUid, childUid, currentViewletId: id }
}

export const hidePanel = async (state: PanelState): Promise<PanelState> => {
  await Command.execute('Layout.hidePanel')
  return state
}

export const handleClickClose = async (state: PanelState): Promise<PanelState> => {
  await Command.execute('Layout.hidePanel')
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
  await Command.execute(fullCommand, value)
  return state
}
