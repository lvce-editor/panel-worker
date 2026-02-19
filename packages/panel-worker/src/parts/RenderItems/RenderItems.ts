import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { PanelState } from '../PanelState/PanelState.ts'
import { getPanelDom } from '../GetPanelDom/GetPanelDom.ts'

export const renderItems = (oldState: PanelState, newState: PanelState): readonly VirtualDomNode[] => {
  const { initial } = newState
  if (initial) {
    return []
  }
  const dom = getPanelDom(newState)
  return dom
}
