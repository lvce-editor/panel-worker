import { expect, jest, test } from '@jest/globals'
import { createMockRpc, PlainMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererProcess as RendererProcessRegistry, RendererWorker } from '@lvce-editor/rpc-registry'
import { handleMessagePort } from '../src/parts/HandleMessagePort/HandleMessagePort.ts'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'

test('connects the view directly to the renderer process', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 31)
  const { promise: forwardedCommand, resolve: resolveForwardedCommand } = Promise.withResolvers<void>()
  let forwardedCommandCount = 0
  const forwardRendererWorkerCommand = jest.fn((_method: string) => {
    forwardedCommandCount++
    if (forwardedCommandCount === 3) {
      resolveForwardedCommand()
    }
  })
  const { port1, port2 } = new MessageChannel()
  const rendererProcessRpc = await PlainMessagePortRpcParent.create({
    commandMap: {
      'Viewlet.forwardRendererWorkerCommand': forwardRendererWorkerCommand,
      'Viewlet.queueCommands': queueCommands,
    },
    messagePort: port1,
  })
  const handleEvent = jest.fn(async (_uid: number, _value: string) => {})
  const handleClickClose = jest.fn(async (_uid: number) => {})
  const handleClickMaximize = jest.fn(async (_uid: number) => {})
  const handleClickUnmaximize = jest.fn(async (_uid: number) => {})

  await handleMessagePort(port2, {
    'Panel.handleClickClose': handleClickClose,
    'Panel.handleClickMaximize': handleClickMaximize,
    'Panel.handleClickUnmaximize': handleClickUnmaximize,
    'Panel.handleEvent': handleEvent,
  })
  expect(RendererProcess.isConnected()).toBe(true)
  await expect(RendererProcess.invoke('Viewlet.queueCommands', 7, [['Viewlet.setDom2', 7, []]])).resolves.toBe(31)
  expect(queueCommands).toHaveBeenCalledWith(7, [['Viewlet.setDom2', 7, []]])

  const requestRender = jest.fn(async (_uid: number) => {})
  RendererWorker.set(
    Object.assign(
      createMockRpc({
        commandMap: {
          'Viewlet.requestRender': requestRender,
        },
      }),
      { dispose: jest.fn() },
    ),
  )
  await rendererProcessRpc.invoke('Viewlet.executeViewletCommand', 7, 'handleEvent', 'hello')
  expect(handleEvent).toHaveBeenCalledWith(7, 'hello')
  expect(requestRender).toHaveBeenCalledWith(7)

  await rendererProcessRpc.invoke('Viewlet.executeViewletCommand', 7, 'handleClickClose')
  await rendererProcessRpc.invoke('Viewlet.executeViewletCommand', 7, 'handleClickMaximize')
  await rendererProcessRpc.invoke('Viewlet.executeViewletCommand', 7, 'handleClickUnmaximize')
  await forwardedCommand
  expect(forwardRendererWorkerCommand).toHaveBeenNthCalledWith(1, 'Layout.hidePanel')
  expect(forwardRendererWorkerCommand).toHaveBeenNthCalledWith(2, 'Layout.maximizePanel')
  expect(forwardRendererWorkerCommand).toHaveBeenNthCalledWith(3, 'Layout.unmaximizePanel')
  expect(handleClickClose).not.toHaveBeenCalled()
  expect(handleClickMaximize).not.toHaveBeenCalled()
  expect(handleClickUnmaximize).not.toHaveBeenCalled()
  expect(requestRender).toHaveBeenCalledTimes(1)

  await expect(rendererProcessRpc.invoke('Viewlet.executeViewletCommand', 7, 'missing')).rejects.toThrow('Viewlet command not found: missing')

  await RendererProcessRegistry.dispose()
  await RendererWorker.dispose()
  await rendererProcessRpc.dispose()
})
