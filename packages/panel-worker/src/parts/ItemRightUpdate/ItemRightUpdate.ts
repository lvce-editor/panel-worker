import type { StatusBarItem } from '../StatusBarItem/StatusBarItem.ts'
import type * as PanelState from '../PanelState/PanelState.ts'
import * as UpdateArray from '../UpdateArray/UpdateArray.ts'

export const itemRightUpdate = (state: Readonly<PanelState.PanelState>, newItem: Readonly<StatusBarItem>): PanelState.PanelState => {
  const { statusBarItemsRight } = state
  const newStatusBarItemsRight = UpdateArray.updateArray([...statusBarItemsRight], newItem)
  return {
    ...state,
    statusBarItemsRight: newStatusBarItemsRight,
  }
}
