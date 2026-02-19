import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTabClassName from '../GetTabClassName/GetTabClassName.ts'

export const createPanelTab = (tab: string, badgeCount: number, isSelected: boolean, index: number): readonly VirtualDomNode[] => {
  const label = tab
  const className = GetTabClassName.getTabClassName(isSelected)
  const childCount = badgeCount ? 2 : 1
  const tabDom: VirtualDomNode = {
    ariaSelected: isSelected,
    childCount,
    className,
    'data-index': index,
    name: tab,
    onClick: DomEventListenerFunctions.HandleClickTab,
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
