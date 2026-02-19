import { ViewletCommand } from '@lvce-editor/constants'
import type { PanelState } from '../PanelState/PanelState.ts'
import { getStatusBarVirtualDom } from '../GetStatusBarVirtualDom/GetStatusBarVirtualDom.ts'

export const renderItems = (oldState: PanelState, newState: PanelState): any => {
  const { initial, uid } = newState
  if (initial) {
    return [ViewletCommand.SetDom2, uid, []]
  }
  const dom = getStatusBarVirtualDom()
  return [ViewletCommand.SetDom2, uid, dom]
}
