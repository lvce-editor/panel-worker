import { PlainMessagePortRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

const layoutCommands: Readonly<Record<string, string>> = {
  handleClickClose: 'Layout.hidePanel',
  handleClickMaximize: 'Layout.maximizePanel',
  handleClickUnmaximize: 'Layout.unmaximizePanel',
}

const forwardLayoutCommand = (layoutCommand: string): void => {
  setTimeout(() => {
    void RendererProcess.invoke('Viewlet.forwardRendererWorkerCommand', layoutCommand)
  }, 0)
}

export const handleMessagePort = async (port: MessagePort, viewletCommandMap: Readonly<Record<string, unknown>>): Promise<void> => {
  const executeViewletCommand = async (uid: number, command: string, ...args: readonly any[]): Promise<void> => {
    const layoutCommand = layoutCommands[command]
    if (layoutCommand) {
      // Forward after this direct event returns so layout callbacks use an idle worker RPC.
      forwardLayoutCommand(layoutCommand)
      return
    }
    const fn = viewletCommandMap[`Panel.${command}`]
    if (typeof fn !== 'function') {
      throw new TypeError(`Viewlet command not found: ${command}`)
    }
    await fn(uid, ...args)
    await RendererWorker.invoke('Viewlet.requestRender', uid)
  }

  const rpc = await PlainMessagePortRpc.create({
    commandMap: {
      'Viewlet.executeViewletCommand': executeViewletCommand,
    },
    messagePort: port,
  })
  RendererProcess.set(rpc)
}
