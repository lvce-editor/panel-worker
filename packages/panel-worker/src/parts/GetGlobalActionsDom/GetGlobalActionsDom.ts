import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
<<<<<<< HEAD
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
=======
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
>>>>>>> origin/main
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as PanelStrings from '../PanelStrings/PanelStrings.ts'

export const getGlobalActionsDom = (): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: ClassNames.PanelToolBar,
      role: AriaRoles.ToolBar,
      type: VirtualDomElements.Div,
    },
    {
      ariaLabel: PanelStrings.maximize(),
      childCount: 1,
      className: ClassNames.IconButton,
      onClick: DomEventListenerFunctions.HandleClickMaximize,
      title: PanelStrings.maximize(),
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.MaskIcon, ClassNames.MaskIconChevronUp),
      type: VirtualDomElements.Div,
    },
    {
      ariaLabel: PanelStrings.close(),
      childCount: 1,
      className: ClassNames.IconButton,
      onClick: DomEventListenerFunctions.HandleClickClose,
      title: PanelStrings.close(),
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.MaskIcon, ClassNames.MaskIconClose),
      type: VirtualDomElements.Div,
    },
  ]
}
