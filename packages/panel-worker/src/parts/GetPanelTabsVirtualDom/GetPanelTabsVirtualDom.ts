import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { PanelView } from '../PanelView/PanelView.ts'
import { createPanelTab } from '../CreatePanelTab/CreatePanelTab.ts'

export const getPanelTabsVirtualDom = (
  tabs: readonly PanelView[],
  selectedIndex: number,
  badgeCounts: Readonly<Record<string, number>>,
): readonly VirtualDomNode[] => {
  const dom: VirtualDomNode[] = []
  for (let i = 0; i < tabs.length; i++) {
    const isSelected = i === selectedIndex
    const tab = tabs[i]
    const badgeCount = badgeCounts[tab.id] || 0
    dom.push(...createPanelTab(tab.id, tab.name, badgeCount, isSelected))
  }
  return dom
}
