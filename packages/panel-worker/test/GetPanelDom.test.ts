import { expect, test } from '@jest/globals'
import { AriaRoles, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { PanelState } from '../src/parts/PanelState/PanelState.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getPanelDom } from '../src/parts/GetPanelDom/GetPanelDom.ts'

test('getPanelDom should render panel with tabs and fallback actions div when actions uid is 0', () => {
  const state: PanelState = {
    ...createDefaultState(),
    actionsUid: 0,
    assetDir: '',
    badgeCounts: {
      PROBLEMS: 3,
    },
    childUid: 11,
    errorCount: 0,
    initial: false,
    platform: 0,
    selectedIndex: 1,
    uid: 1,
    views: ['PROBLEMS', 'OUTPUT'],
    warningCount: 0,
  }

  const dom = getPanelDom(state)

  expect(dom).toEqual([
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
      childCount: 2,
      className: 'PanelTabs',
      type: VirtualDomElements.Div,
    },
    {
      ariaSelected: false,
      childCount: 2,
      className: ClassNames.PanelTab,
      'data-index': 0,
      name: 'PROBLEMS',
      onClick: DomEventListenerFunctions.HandleClickTab,
      role: AriaRoles.Tab,
      type: VirtualDomElements.Button,
    },
    text('PROBLEMS'),
    {
      childCount: 1,
      className: ClassNames.Badge,
      type: VirtualDomElements.Div,
    },
    text(' 3'),
    {
      ariaSelected: true,
      childCount: 1,
      className: `${ClassNames.PanelTab} ${ClassNames.PanelTabSelected}`,
      'data-index': 1,
      name: 'OUTPUT',
      onClick: DomEventListenerFunctions.HandleClickTab,
      role: AriaRoles.Tab,
      type: VirtualDomElements.Button,
    },
    text('OUTPUT'),
    {
      childCount: 0,
      className: 'Actions',
      role: 'toolbar',
      type: VirtualDomElements.Div,
    },
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
      title: 'Maximize',
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
      title: 'Close',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconClose',
      type: VirtualDomElements.Div,
    },
    {
      type: VirtualDomElements.Reference,
      uid: 11,
    },
  ])
})

test('getPanelDom should render actions reference when actions uid is set', () => {
  const state: PanelState = {
    ...createDefaultState(),
    actionsUid: 42,
    assetDir: '',
    badgeCounts: {},
    childUid: 99,
    errorCount: 0,
    initial: false,
    platform: 0,
    selectedIndex: 0,
    uid: 1,
    views: ['PROBLEMS'],
    warningCount: 0,
  }

  const dom = getPanelDom(state)

  expect(dom).toContainEqual({
    type: VirtualDomElements.Reference,
    uid: 42,
  })

  expect(dom).not.toContainEqual({
    childCount: 0,
    className: 'Actions',
    role: 'toolbar',
    type: VirtualDomElements.Div,
  })

  expect(dom.at(-1)).toEqual({
    type: VirtualDomElements.Reference,
    uid: 99,
  })
})
