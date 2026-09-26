import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { PanelState } from '../src/parts/PanelState/PanelState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/Load/Load.ts'

const createState = (): PanelState => ({
  ...createDefaultState(),
  childUid: 12,
  currentViewletId: 'Ports',
  height: 200,
  views: ['Problems', 'Ports'],
  width: 300,
})

test('loadContent falls back to Problems when restoring Ports in a local workspace', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.createPanelViewlet': async () => {},
    'SaveState.saveViewletStateWithStorageId': async () => {},
    'Viewlet.dispose': async () => {},
  })
  const random = jest.spyOn(Math, 'random').mockReturnValue(42)

  try {
    const result = await loadContent(createState(), { currentViewletId: 'Ports' }, 'file:///workspace')

    expect(result).toMatchObject({
      currentViewletId: 'Problems',
      selectedIndex: 0,
      views: ['Problems', 'Output', 'Debug Console', 'Terminals'],
    })
  } finally {
    random.mockRestore()
  }
  expect(mockRpc.invocations).toContainEqual(['Layout.createPanelViewlet', 'Problems', 42, 42, 42, expect.any(Object), '', false])
})

test('loadContent preserves Ports in a remote ssh workspace', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.createPanelViewlet': async () => {},
    'SaveState.saveViewletStateWithStorageId': async () => {},
    'Viewlet.dispose': async () => {},
  })
  const random = jest.spyOn(Math, 'random').mockReturnValue(42)

  try {
    const result = await loadContent(createState(), { currentViewletId: 'Ports' }, 'remote-ssh://host/workspace')

    expect(result).toMatchObject({
      currentViewletId: 'Ports',
      selectedIndex: 4,
      views: ['Problems', 'Output', 'Debug Console', 'Terminals', 'Ports'],
    })
  } finally {
    random.mockRestore()
  }
  expect(mockRpc.invocations).toContainEqual(['Layout.createPanelViewlet', 'Ports', 42, 42, 42, expect.any(Object), '', false])
})

test('loadContent restores hidden panel views and selects a visible view', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.createPanelViewlet': async () => {},
    'SaveState.saveViewletStateWithStorageId': async () => {},
    'Viewlet.dispose': async () => {},
  })
  const random = jest.spyOn(Math, 'random').mockReturnValue(42)

  try {
    const result = await loadContent(createState(), { currentViewletId: 'Output', hiddenViews: ['Problems', 'Output'] }, 'file:///workspace')

    expect(result).toMatchObject({
      availableViews: ['Problems', 'Output', 'Debug Console', 'Terminals'],
      currentViewletId: 'Debug Console',
      hiddenViews: ['Problems', 'Output'],
      selectedIndex: 0,
      views: ['Debug Console', 'Terminals'],
    })
  } finally {
    random.mockRestore()
  }
  expect(mockRpc.invocations).toContainEqual(['Layout.createPanelViewlet', 'Debug Console', 42, 42, 42, expect.any(Object), '', false])
})
