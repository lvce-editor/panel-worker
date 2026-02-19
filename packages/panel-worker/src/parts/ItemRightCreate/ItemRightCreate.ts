import type { StatusBarItem } from '../StatusBarItem/StatusBarItem.ts'
import type * as PanelState from '../PanelState/PanelState.ts'

export const itemRightCreate = (state: Readonly<PanelState.PanelState>, newItem: Readonly<StatusBarItem>): PanelState.PanelState => {
  const { statusBarItemsRight } = state
  const newStatusBarItemsRight = [...statusBarItemsRight, newItem]
  return {
    ...state,
    statusBarItemsRight: newStatusBarItemsRight,
  }
}
