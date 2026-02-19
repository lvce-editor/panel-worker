import type { StatusBarItem } from '../StatusBarItem/StatusBarItem.ts'
import type { PanelState } from '../PanelState/PanelState.ts'

export const itemLeftCreate = (state: PanelState, name: string, text: string, tooltip: string, ariaLabel: string): PanelState => {
  const { statusBarItemsLeft } = state
  const newItem: StatusBarItem = {
    ariaLabel,
    elements: [{ type: 'text', value: text }],
    name,
    tooltip,
  }
  const newStatusBarItemsLeft = [...statusBarItemsLeft, newItem]
  return {
    ...state,
    statusBarItemsLeft: newStatusBarItemsLeft,
  }
}
