import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { PanelState } from '../src/parts/PanelState/PanelState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { toggleView } from '../src/parts/ToggleView/ToggleView.ts'
import { toggleViewVisibility } from '../src/parts/ToggleViewVisibility/ToggleViewVisibility.ts'

const createState = (currentViewletId = 'Problems'): PanelState => ({
  ...createDefaultState(),
  availableViews: ['Problems', 'Output', 'Debug Console'],
  childUid: 10,
  currentViewletId,
  selectedIndex: ['Problems', 'Output', 'Debug Console'].indexOf(currentViewletId),
  uid: 20,
  views: ['Problems', 'Output', 'Debug Console'],
})

test('toggleViewVisibility hides an inactive view and keeps available view state', async () => {
  const state = createState('Debug Console')

  const result = await toggleViewVisibility(state, 'Output')

  expect(result).toMatchObject({
    availableViews: ['Problems', 'Output', 'Debug Console'],
    currentViewletId: 'Debug Console',
    hiddenViews: ['Output'],
    selectedIndex: 1,
    views: ['Problems', 'Debug Console'],
  })
})

test('toggleViewVisibility restores a hidden view without duplicating it', async () => {
  const state: PanelState = {
    ...createState('Debug Console'),
    hiddenViews: ['Output'],
    selectedIndex: 1,
    views: ['Problems', 'Debug Console'],
  }

  const result = await toggleViewVisibility(state, 'Output')

  expect(result.views).toEqual(['Problems', 'Output', 'Debug Console'])
  expect(result.selectedIndex).toBe(2)
  expect(result.hiddenViews).toEqual([])
})

test('toggleViewVisibility selects the next visible view when hiding the active view', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.createPanelViewlet': async () => {},
    'SaveState.saveViewletStateWithStorageId': async () => {},
  })
  const result = await toggleViewVisibility(createState('Output'), 'Output')

  expect(result).toMatchObject({
    currentViewletId: 'Debug Console',
    hiddenViews: ['Output'],
    selectedIndex: 1,
    views: ['Problems', 'Debug Console'],
  })
  expect(mockRpc.invocations).toContainEqual([
    'Layout.createPanelViewlet',
    'Debug Console',
    expect.any(Number),
    expect.any(Number),
    expect.any(Number),
    expect.any(Object),
    '',
    false,
  ])
})

test('toggleViewVisibility keeps the last visible view recoverable', async () => {
  const state: PanelState = {
    ...createState('Problems'),
    views: ['Problems'],
  }

  const result = await toggleViewVisibility(state, 'Problems')

  expect(result).toBe(state)
})

test('toggleView explicitly shows and selects a hidden panel view', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.createPanelViewlet': async () => {},
    'SaveState.saveViewletStateWithStorageId': async () => {},
  })
  const state: PanelState = {
    ...createState(),
    hiddenViews: ['Output'],
    views: ['Problems', 'Debug Console'],
  }

  const result = await toggleView(state, 'Output')

  expect(result).toMatchObject({
    currentViewletId: 'Output',
    hiddenViews: [],
    selectedIndex: 1,
    views: ['Problems', 'Output', 'Debug Console'],
  })
  expect(mockRpc.invocations).toContainEqual([
    'Layout.createPanelViewlet',
    'Output',
    expect.any(Number),
    expect.any(Number),
    expect.any(Number),
    expect.any(Object),
    '',
    true,
  ])
})
