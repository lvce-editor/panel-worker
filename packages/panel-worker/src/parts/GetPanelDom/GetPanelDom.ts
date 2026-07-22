import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { PanelState } from '../PanelState/PanelState.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getPanelHeaderDom } from '../GetPanelHeaderDom/GetPanelHeaderDom.ts'

const panelNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.Panel,
  type: VirtualDomElements.Div,
}

export const getPanelDom = (newState: PanelState): readonly VirtualDomNode[] => {
  const { childUid } = newState
  return [
    panelNode,
    ...getPanelHeaderDom(newState),
    {
      type: VirtualDomElements.Reference,
      uid: childUid,
    },
  ]
}
