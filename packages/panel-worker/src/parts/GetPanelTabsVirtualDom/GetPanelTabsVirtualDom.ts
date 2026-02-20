import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { createPanelTab } from '../CreatePanelTab/CreatePanelTab.ts'

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
    dom.push(...createPanelTab(tab, badgeCount, isSelected))
  }
  return dom
}
