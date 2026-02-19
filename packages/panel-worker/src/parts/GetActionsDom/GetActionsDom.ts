import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { PanelState } from '../PanelState/PanelState.ts'

export const getActionsDom = (newState: PanelState): readonly VirtualDomNode[] => {
  const actions = newState.actionsUid || -1
  if (actions === -1) {
    return [
      {
        childCount: 0,
        className: 'Actions',
        role: 'toolbar',
        type: VirtualDomElements.Div,
      },
    ]
  }
  return [
    {
      type: VirtualDomElements.Reference,
      uid: actions,
    },
  ]
}
