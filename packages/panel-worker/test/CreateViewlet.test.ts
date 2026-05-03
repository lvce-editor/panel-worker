import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CreateViewlet from '../src/parts/CreateViewlet/CreateViewlet.ts'

test('createViewlet should invoke Layout.createPanelViewlet with expected arguments', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.createPanelViewlet': async () => {},
  })

  const viewletModuleId = 'test.viewlet'
  const editorUid = 42
  const tabId = 7
  const actionsUid = 8
  const bounds = { height: 200, width: 100, x: 1, y: 2 }
  const uri = 'file:///test.txt'

  await CreateViewlet.createViewlet(viewletModuleId, editorUid, tabId, actionsUid, bounds, uri)

  expect(mockRpc.invocations).toEqual([['Layout.createPanelViewlet', viewletModuleId, editorUid, tabId, actionsUid, bounds, uri]])
})

test('createViewlet should propagate rpc errors', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.createPanelViewlet': async () => {
      throw new Error('failed to create viewlet')
    },
  })

  const promise = CreateViewlet.createViewlet('test.viewlet', 1, 2, 3, { height: 10, width: 10, x: 0, y: 0 }, 'file:///test')

  await expect(promise).rejects.toThrow('failed to create viewlet')
  expect(mockRpc.invocations).toEqual([['Layout.createPanelViewlet', 'test.viewlet', 1, 2, 3, { height: 10, width: 10, x: 0, y: 0 }, 'file:///test']])
})
