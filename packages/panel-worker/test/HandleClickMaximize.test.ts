import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickMaximize from '../src/parts/HandleClickMaximize/HandleClickMaximize.ts'

test('handleClickMaximize invokes Layout.maximizePanel', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.maximizePanel': async () => {},
  })
  const state = createDefaultState()

  const result = await HandleClickMaximize.handleClickMaximize(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Layout.maximizePanel']])
})

test('handleClickUnmaximize invokes Layout.unmaximizePanel', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.unmaximizePanel': async () => {},
  })
  const state = createDefaultState()

  const result = await HandleClickMaximize.handleClickUnmaximize(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Layout.unmaximizePanel']])
})
