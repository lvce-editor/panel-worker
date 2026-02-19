import { ViewletCommand } from '@lvce-editor/constants'
import type { PanelState } from '../PanelState/PanelState.ts'
import { getPanelDom } from '../GetPanelDom/GetPanelDom.ts'

export const renderItems = (oldState: PanelState, newState: PanelState): any => {
  const { initial, uid } = newState
  if (initial) {
    return [ViewletCommand.SetDom2, uid, []]
  }
  const dom = getPanelDom(newState)
  return [ViewletCommand.SetDom2, uid, dom]
}
