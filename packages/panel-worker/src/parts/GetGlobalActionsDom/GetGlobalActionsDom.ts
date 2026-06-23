import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { PanelState } from '../PanelState/PanelState.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as PanelStrings from '../PanelStrings/PanelStrings.ts'

export const getGlobalActionsDom = (state: Pick<PanelState, 'maximized'>): readonly VirtualDomNode[] => {
  const { maximized } = state
  const maximizeLabel = maximized ? PanelStrings.unmaximize() : PanelStrings.maximize()
  const maximizeOnClick = maximized ? DomEventListenerFunctions.HandleClickUnmaximize : DomEventListenerFunctions.HandleClickMaximize
  const maximizeIcon = maximized ? ClassNames.MaskIconRestore : ClassNames.MaskIconChevronUp
  return [
    {
      childCount: 2,
      className: ClassNames.PanelToolBar,
      role: AriaRoles.ToolBar,
      type: VirtualDomElements.Div,
    },
    {
      ariaLabel: maximizeLabel,
      childCount: 1,
      className: ClassNames.IconButton,
      onClick: maximizeOnClick,
      title: maximizeLabel,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.MaskIcon, maximizeIcon),
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
