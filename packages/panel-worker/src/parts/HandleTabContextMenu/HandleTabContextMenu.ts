import { MenuEntryId } from '@lvce-editor/constants'
import type { PanelState } from '../PanelState/PanelState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleTabContextMenu = async (state: PanelState, _button: number, x: number, y: number): Promise<PanelState> => {
  Assert.number(x)
  Assert.number(y)
  const { uid } = state
  await ContextMenu.show2(uid, MenuEntryId.Tab, x, y, {
    menuId: MenuEntryId.Tab,
  })
  return state
}
