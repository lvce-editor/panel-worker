import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const createPanelTab = (tab: string, badgeCount: number, isSelected: boolean, index: number): readonly VirtualDomNode[] => {
  const label = tab
  let className = ClassNames.PanelTab
  if (isSelected) {
    className += ' ' + ClassNames.PanelTabSelected
  }
  const childCount = badgeCount ? 2 : 1
  const tabDom: VirtualDomNode = {
    ariaSelected: isSelected,
    childCount,
    className,
    'data-index': index,
    onClick: DomEventListenerFunctions.HandleClickSelectTab,
    role: AriaRoles.Tab,
    type: VirtualDomElements.Div,
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

export const getPanelTabsVirtualDom = (
  tabs: readonly string[],
  selectedIndex: number,
  badgeCounts: Readonly<Record<string, number>>,
): readonly VirtualDomNode[] => {
  const dom: VirtualDomNode[] = []
  for (let i = 0; i < tabs.length; i++) {
    const isSelected = i === selectedIndex
    const tab = tabs[i]
    const badgeCount = badgeCounts[tab] || 0
    dom.push(...createPanelTab(tab, badgeCount, isSelected, i))
  }
  return dom
}
