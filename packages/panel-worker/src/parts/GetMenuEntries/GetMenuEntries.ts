import { MenuEntryId, MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import type { PanelState } from '../PanelState/PanelState.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

const getViewMenuItemFlags = (state: PanelState, view: string): number => {
  return state.currentViewletId === view ? MenuItemFlags.Checked : MenuItemFlags.Unchecked
}

const getViewMenuEntry = (state: PanelState, view: string): MenuEntry => {
  return {
    args: [view],
    command: 'Panel.selectName',
    flags: getViewMenuItemFlags(state, view),
    id: `panelTab.${view}`,
    label: view,
  }
}

const getTabMenuEntries = (state: PanelState): readonly MenuEntry[] => {
  return [
    getViewMenuEntry(state, ViewletModuleId.Problems),
    getViewMenuEntry(state, ViewletModuleId.Output),
    getViewMenuEntry(state, ViewletModuleId.DebugConsole),
    getViewMenuEntry(state, ViewletModuleId.Terminals),
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Layout.maximizePanel',
      flags: MenuItemFlags.None,
      id: 'panel.maximize',
      label: 'Maximize Panel',
    },
    {
      command: 'Layout.hidePanel',
      flags: MenuItemFlags.None,
      id: 'panel.hide',
      label: 'Hide Panel',
    },
  ]
}

export const getMenuEntries = (state: PanelState, props: ContextMenuProps): readonly MenuEntry[] => {
  switch (props.menuId) {
    case MenuEntryId.Tab:
      return getTabMenuEntries(state)
    default:
      return []
  }
}
