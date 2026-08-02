import { RendererWorker } from '@lvce-editor/rpc-registry'

export const saveViewletState = async (childUid: number, viewletId: string): Promise<void> => {
  if (childUid <= 0 || !viewletId) {
    return
  }
  await RendererWorker.invoke('SaveState.saveViewletStateWithStorageId', childUid, viewletId)
}
