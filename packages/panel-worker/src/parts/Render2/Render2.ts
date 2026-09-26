import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import { hideViewlet } from '../HideViewlet/HideViewlet.ts'
import * as SourceControlStates from '../PanelStates/PanelStates.ts'
import * as PendingDisposals from '../PendingDisposals/PendingDisposals.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const render2 = async (uid: number, diffResult: readonly number[]): Promise<readonly any[]> => {
  const { newState, oldState } = SourceControlStates.get(uid)
  SourceControlStates.set(uid, newState, newState)
  const commands = [...ApplyRender.applyRender(oldState, newState, diffResult)]
  // Keep referenced DOM nodes until the parent patches have replaced them.
  for (const childUid of PendingDisposals.take(uid)) {
    commands.push(...(await hideViewlet(childUid)))
  }
  if (!RendererProcess.isConnected()) return commands
  return renderDirect(uid, commands)
}

const renderDirect = async (uid: number, commands: readonly any[]): Promise<readonly any[]> => {
  const transactionId = await RendererProcess.invoke('Viewlet.queueCommands', uid, commands)
  return [['Viewlet.commitPending', uid, transactionId]]
}
