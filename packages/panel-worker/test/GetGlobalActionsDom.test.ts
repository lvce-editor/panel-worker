import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getGlobalActionsDom } from '../src/parts/GetGlobalActionsDom/GetGlobalActionsDom.ts'

test('getGlobalActionsDom should render maximize and close toolbar actions', () => {
  const dom = getGlobalActionsDom()

  expect(dom).toEqual([
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
  ])
})
