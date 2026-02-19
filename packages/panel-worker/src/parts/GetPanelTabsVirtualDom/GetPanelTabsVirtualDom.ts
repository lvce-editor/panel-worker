import { AriaRoles, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const createPanelTab = (tab, badgeCount, isSelected, index) => {
  const label = tab
  let className = ClassNames.PanelTab
  if (isSelected) {
    className += ' ' + ClassNames.PanelTabSelected
  }
  const dom = [
    div(
      {
        ariaSelected: isSelected,
        className,
        'data-index': index,
        onClick: DomEventListenerFunctions.HandleClickSelectTab,
        role: AriaRoles.Tab,
      },
      1,
    ),
    text(label),
  ]
  if (badgeCount) {
    dom[0].childCount++
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

export const getPanelTabsVirtualDom = (tabs, selectedIndex, badgeCounts) => {
  const dom = []
  for (let i = 0; i < tabs.length; i++) {
    const isSelected = i === selectedIndex
    const tab = tabs[i]
    const badgeCount = badgeCounts[tab] || 0
    dom.push(...createPanelTab(tab, badgeCount, isSelected, i))
  }
  return dom
}
