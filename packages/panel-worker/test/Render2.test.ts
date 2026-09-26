import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as PanelStates from '../src/parts/PanelStates/PanelStates.ts'
import * as PendingDisposals from '../src/parts/PendingDisposals/PendingDisposals.ts'
import { render2 } from '../src/parts/Render2/Render2.ts'

test('render2 replaces child references before disposing every retired child DOM', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.hide': async (uid: number) => [['Viewlet.dispose', uid]],
  })
  const oldState = { ...createDefaultState(), childUid: 101, initial: false, uid: 100 }
  const newState = { ...oldState, childUid: 103 }
  PanelStates.set(100, oldState, newState)
  PendingDisposals.add(100, 101)
  PendingDisposals.add(100, 102)
  PendingDisposals.add(100, 101)

  const commands = await render2(100, [DiffType.RenderIncremental])

  expect(commands).toHaveLength(3)
  expect(commands[0][1]).toBe(100)
  expect(commands.slice(1)).toEqual([
    ['Viewlet.dispose', 101],
    ['Viewlet.dispose', 102],
  ])
  expect(mockRpc.invocations).toEqual([
    ['Viewlet.hide', 101],
    ['Viewlet.hide', 102],
  ])
  expect(await render2(100, [])).toEqual([])
})
