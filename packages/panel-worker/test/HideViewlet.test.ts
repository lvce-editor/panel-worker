import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { hideViewlet } from '../src/parts/HideViewlet/HideViewlet.ts'

test('hideViewlet supports older renderers without Viewlet.hide', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.dispose': async () => {},
    'Viewlet.hide': async () => {
      throw new Error('command Viewlet.hide not found')
    },
  })
  expect(await hideViewlet(12)).toEqual([])
  expect(mockRpc.invocations).toEqual([
    ['Viewlet.hide', 12],
    ['Viewlet.dispose', 12, true],
  ])
})

test('hideViewlet propagates cleanup failures without retrying disposal', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Viewlet.hide': async () => {
      throw new Error('worker cleanup failed')
    },
  })
  await expect(hideViewlet(12)).rejects.toThrow('worker cleanup failed')
  expect(mockRpc.invocations).toEqual([['Viewlet.hide', 12]])
})
