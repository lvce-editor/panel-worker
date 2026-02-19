import type { StatusBarItem } from '../StatusBarItem/StatusBarItem.ts'
import type * as PanelState from '../PanelState/PanelState.ts'
import * as UpdateArray from '../UpdateArray/UpdateArray.ts'

export const itemLeftUpdate = (state: Readonly<PanelState.PanelState>, newItem: Readonly<StatusBarItem>): PanelState.PanelState => {
  return {
    ...state,
    statusBarItemsLeft: UpdateArray.updateArray([...state.statusBarItemsLeft], newItem),
  }
}
