import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getPanelTabsVirtualDom } from '../GetPanelTabsVirtualDom/GetPanelTabsVirtualDom.js'

const getActionsDom = (newState) => {
  const actions = newState.actionsUid || -1
  if (actions === -1) {
    return [
      {
        childCount: 0,
        className: 'Actions',
        role: 'toolbar',
        type: VirtualDomElements.Div,
      },
    ]
  }
  return [
    {
      type: VirtualDomElements.Reference,
      uid: actions,
    },
  ]
}

const getGlobalActionsDom = (newState) => {
  return [
    {
      childCount: 2,
      className: 'PanelToolBar',
      role: 'toolbar',
      type: VirtualDomElements.Div,
    },
    {
      ariaLabel: 'Maximize',
      childCount: 1,
      className: 'IconButton',
      onClick: DomEventListenerFunctions.HandleClickMaximize,
      titleM: 'Maximize',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconChevronUp',
      type: VirtualDomElements.Div,
    },
    {
      ariaLabel: 'Close',
      childCount: 1,
      className: 'IconButton',
      onClick: DomEventListenerFunctions.HandleClickClose,
      titleM: 'Close',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconClose',
      type: VirtualDomElements.Div,
    },
  ]
}

export const getPanelDom = (newState) => {
  const { childUid } = newState
  const tabsDom = getPanelTabsVirtualDom(newState.views, newState.selectedIndex, newState.badgeCounts)
  return [
    {
      childCount: 2,
      className: 'Panel',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
      className: 'PanelHeader',
      type: VirtualDomElements.Div,
    },
    {
      childCount: newState.views.length,
      className: 'PanelTabs',
      type: VirtualDomElements.Div,
    },
    ...tabsDom,
    ...getActionsDom(newState),
    ...getGlobalActionsDom(newState),
    {
      type: VirtualDomElements.Reference,
      uid: childUid,
    },
  ]
}
