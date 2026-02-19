import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { StatusBarItem } from '../StatusBarItem/StatusBarItem.ts'

export const getStatusBarVirtualDom = (
  statusBarItemsLeft: readonly StatusBarItem[],
  statusBarItemsRight: readonly StatusBarItem[],
): readonly VirtualDomNode[] => {
  const dom: VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      childCount: 0,
      className: 'Panel',
    },
  ]
  return dom
}
