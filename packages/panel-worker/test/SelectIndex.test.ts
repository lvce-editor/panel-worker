import { expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as SelectIndex from '../src/parts/SelectIndex/SelectIndex.ts'

test('selectIndex focuses the selected panel view with the requested uri', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.createPanelViewlet': async () => {},
  })
  const randomSpy = jest.spyOn(Math, 'random').mockReturnValueOnce(11).mockReturnValueOnce(22).mockReturnValueOnce(33)
  const state = {
    ...createDefaultState(),
    height: 200,
    views: ['Problems', 'Terminals'],
    width: 300,
    x: 10,
    y: 20,
  }

  const result = await SelectIndex.selectIndex(state, 1, 'file:///workspace/folder')

  expect(mockRpc.invocations).toEqual([
    ['Layout.createPanelViewlet', 'Terminals', 11, 22, 33, { height: 165, width: 300, x: 10, y: 55 }, 'file:///workspace/folder', true],
  ])
  expect(result).toMatchObject({
    childUid: 11,
    currentViewletId: 'Terminals',
    selectedIndex: 1,
  })
  randomSpy.mockRestore()
})
