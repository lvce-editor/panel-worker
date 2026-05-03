import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleTabContextMenu } from '../src/parts/HandleTabContextMenu/HandleTabContextMenu.ts'
import type { PanelState } from '../src/parts/PanelState/PanelState.ts'

test('handleTabContextMenu shows the tab context menu', async () => {
  const state: PanelState = {
    ...createDefaultState(),
    uid: 42,
  }

  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {},
  })

  const result = await handleTabContextMenu(state, 2, 10, 20)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      42,
      MenuEntryId.Tab,
      10,
      20,
      {
        menuId: MenuEntryId.Tab,
      },
    ],
  ])
})
