import { expect, test } from '@jest/globals'
import { MenuEntryId, MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../src/parts/ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../src/parts/MenuEntry/MenuEntry.ts'
import type { PanelState } from '../src/parts/PanelState/PanelState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntries } from '../src/parts/GetMenuEntries/GetMenuEntries.ts'

test('getMenuEntries returns panel tab context menu entries', () => {
  const state: PanelState = {
    ...createDefaultState(),
    currentViewletId: 'Problems',
  }
  const props: ContextMenuProps = {
    menuId: MenuEntryId.Tab,
  }

  const result: readonly MenuEntry[] = getMenuEntries(state, props)

  expect(result).toHaveLength(7)
  expect(result[0]).toEqual({
    args: ['Problems'],
    command: 'Panel.selectName',
    flags: MenuItemFlags.Checked,
    id: 'panelTab.Problems',
    label: 'Problems',
  })
  expect(result[1].flags).toBe(MenuItemFlags.Unchecked)
  expect(result[2].flags).toBe(MenuItemFlags.Unchecked)
  expect(result[3].flags).toBe(MenuItemFlags.Unchecked)
  expect(result[5]).toEqual({
    command: 'Layout.maximizePanel',
    flags: MenuItemFlags.None,
    id: 'panel.maximize',
    label: 'Maximize Panel',
  })
  expect(result[6]).toEqual({
    command: 'Layout.hidePanel',
    flags: MenuItemFlags.None,
    id: 'panel.hide',
    label: 'Hide Panel',
  })
})

test('getMenuEntries returns empty array for unsupported menu id', () => {
  const state: PanelState = {
    ...createDefaultState(),
  }
  const props = {
    menuId: MenuEntryId.Main,
  } as unknown as ContextMenuProps

  const result = getMenuEntries(state, props)

  expect(result).toEqual([])
})
