import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getGlobalActionsDom = (): readonly VirtualDomNode[] => {
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
