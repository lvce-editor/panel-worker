import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CreateViewlet from '../src/parts/CreateViewlet/CreateViewlet.ts'

test('createViewlet should invoke Layout.createViewlet with expected arguments', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.createViewlet': async () => {},
  })

  const viewletModuleId = 'test.viewlet'
  const editorUid = 42
  const tabId = 7
  const bounds = { height: 200, width: 100, x: 1, y: 2 }
  const uri = 'file:///test.txt'

  await CreateViewlet.createViewlet(viewletModuleId, editorUid, tabId, bounds, uri)

  expect(mockRpc.invocations).toEqual([['Layout.createViewlet', viewletModuleId, editorUid, tabId, bounds, uri]])
})

test('createViewlet should propagate rpc errors', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.createViewlet': async () => {
      throw new Error('failed to create viewlet')
    },
  })

  const promise = CreateViewlet.createViewlet('test.viewlet', 1, 2, { height: 10, width: 10, x: 0, y: 0 }, 'file:///test')

  await expect(promise).rejects.toThrow('failed to create viewlet')
  expect(mockRpc.invocations).toEqual([['Layout.createViewlet', 'test.viewlet', 1, 2, { height: 10, width: 10, x: 0, y: 0 }, 'file:///test']])
})
