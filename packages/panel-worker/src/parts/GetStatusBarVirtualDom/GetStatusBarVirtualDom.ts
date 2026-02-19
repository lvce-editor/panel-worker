import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

export const getStatusBarVirtualDom = (): readonly VirtualDomNode[] => {
  const dom: VirtualDomNode[] = [
    {
      childCount: 0,
      className: 'Panel',
      type: VirtualDomElements.Div,
    },
  ]
  return dom
}
