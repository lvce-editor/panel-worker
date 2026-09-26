import { RendererWorker } from '@lvce-editor/rpc-registry'

export const hideViewlet = async (uid: number): Promise<readonly any[]> => {
  try {
    return await RendererWorker.invoke('Viewlet.hide', uid)
  } catch (error) {
    // Older renderers do not support deferred container disposal yet.
    if (!(error instanceof Error) || !error.message.includes('Viewlet.hide') || !error.message.toLowerCase().includes('not found')) {
      throw error
    }
    const commands = await RendererWorker.invoke('Viewlet.dispose', uid, true)
    return Array.isArray(commands) ? commands : []
  }
}
