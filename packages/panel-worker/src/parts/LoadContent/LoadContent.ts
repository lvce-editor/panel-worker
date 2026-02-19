import * as Assert from '../Assert/Assert.ts'
import * as GetPanelViews from '../GetPanelViews/GetPanelViews.js'
import * as Id from '../Id/Id.js'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.js'

const getSavedViewletId = (savedState) => {
  if (savedState && savedState.currentViewletId) {
    return savedState.currentViewletId || ViewletModuleId.Problems
  }
  return ViewletModuleId.Problems
}

export const loadContent = (state, savedState) => {
  const savedViewletId = getSavedViewletId(savedState)
  const views = GetPanelViews.getPanelViews()
  const loaded = {
    ...state,
    currentViewletId: savedViewletId,
    views,
  }
  return openViewlet(loaded, savedViewletId)
}

export const setBadgeCount = (state, id, count) => {
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

const getContentDimensions = (dimensions) => {
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

export const dispose = (state) => {
  return {
    ...state,
    disposed: true,
  }
}

export const openViewlet = async (state, id, focus = false) => {
  const { currentViewletId } = state
  const childDimensions = getContentDimensions(state)

  const { uid } = state

  const childUid = Id.create()

  const commands = await ViewletManager.load(
    {
      append: false,
      args: [],
      focus: false,
      getModule: ViewletModule.load,
      height: childDimensions.height,
      id: currentViewletId,
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
  let actionsDom = []
  let actionsUid = -1
  if (commands) {
    const actionsDomIndex = commands.findIndex((command) => command[2] === 'setActionsDom')
    if (actionsDomIndex !== -1) {
      actionsDom = commands[actionsDomIndex][3]
      commands.splice(actionsDomIndex, 1)
    }
    const eventsIndex = commands.findIndex((command) => command[0] === 'Viewlet.registerEventListeners')
    const events = commands[eventsIndex][2]
    actionsUid = Id.create()
    commands.push(
      ['Viewlet.createFunctionalRoot', currentViewletId, actionsUid, true],
      ['Viewlet.registerEventListeners', actionsUid, events],
      ['Viewlet.setDom2', actionsUid, actionsDom],
      ['Viewlet.setUid', actionsUid, childUid],
    )
    await RendererProcess.invoke('Viewlet.sendMultiple', commands)
  }
  return { ...state, actionsUid, childUid, currentViewletId }
}

export const hidePanel = async (state) => {
  await Command.execute('Layout.hidePanel')
  return state
}

export const handleClickClose = async (state) => {
  await Command.execute('Layout.hidePanel')
  return state
}

export const handleClickMaximize = async (state) => {
  // TODO
  return state
}

export const selectIndex = async (state, index) => {
  await openViewlet(state, state.views[index])
  return {
    ...state,
    selectedIndex: index,
  }
}

export const selectRaw = async (state, rawIndex) => {
  return selectIndex(state, Number.parseInt(rawIndex))
}

export const selectView = async (state, name) => {
  const index = state.views.find((view) => view === name)
  if (index === -1) {
    return state
  }
  return selectIndex(state, index)
}

export const toggleView = async (state, name) => {
  const index = state.views.find((view) => view === name)
  if (index === -1) {
    return state
  }
  if (name === state.currentViewletId) {
    // await Command.execute('Layout.hidePanel') // TODO
    return state
  }
  return selectIndex(state, index)
}

export const handleFilterInput = async (state, value) => {
  Assert.object(state)
  Assert.string(value)
  const { currentViewletId } = state
  const fullCommand = `${currentViewletId}.handleFilterInput`
  await Command.execute(fullCommand, value)
  return state
}
