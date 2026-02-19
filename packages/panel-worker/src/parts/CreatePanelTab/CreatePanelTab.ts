import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const getTabClassName = (isSelected: boolean): string => {
  let className = ClassNames.PanelTab
  if (isSelected) {
    className += ' ' + ClassNames.PanelTabSelected
  }
  return className
}

export const createPanelTab = (tab: string, badgeCount: number, isSelected: boolean, index: number): readonly VirtualDomNode[] => {
  const label = tab
  const className = getTabClassName(isSelected)
  const childCount = badgeCount ? 2 : 1
  const tabDom: VirtualDomNode = {
    ariaSelected: isSelected,
    childCount,
    className,
    'data-index': index,
    name: tab,
    onClick: DomEventListenerFunctions.HandleClickSelectTab,
    role: AriaRoles.Tab,
    type: VirtualDomElements.Button,
  }
  const dom: VirtualDomNode[] = [tabDom, text(label)]
  if (badgeCount) {
    dom.push(
      {
        childCount: 1,
        className: ClassNames.Badge,
        type: VirtualDomElements.Div,
      },
      text(' ' + badgeCount),
    )
  }
  return dom
}
