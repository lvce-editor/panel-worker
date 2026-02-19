import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getStatusBarVirtualDom = (): readonly VirtualDomNode[] => {
  const dom: VirtualDomNode[] = [
    {
      childCount: 0,
      className: ClassNames.Panel,
      type: VirtualDomElements.Div,
    },
  ]
  return dom
}
