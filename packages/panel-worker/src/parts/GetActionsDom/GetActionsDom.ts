import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { PanelState } from '../PanelState/PanelState.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

const emptyActionsNode: VirtualDomNode = {
  childCount: 0,
  className: ClassNames.Actions,
  role: AriaRoles.ToolBar,
  type: VirtualDomElements.Div,
}

export const getActionsDom = (newState: PanelState): readonly VirtualDomNode[] => {
  const actions = newState.actionsUid || -1
  if (actions <= 0) {
    return [emptyActionsNode]
  }
  return [
    {
      type: VirtualDomElements.Reference,
      uid: actions,
    },
  ]
}
