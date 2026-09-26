import { RendererWorker } from '@lvce-editor/rpc-registry'

const command = 'SaveState.saveViewletStateWithStorageId'

const isCommandNotFoundError = (error: unknown): boolean => {
  if (!(error instanceof Error)) {
    return false
  }
  const message = error.message.toLowerCase()
  return message.includes(command.toLowerCase()) && message.includes('not found')
}

export const saveViewletState = async (childUid: number, viewletId: string): Promise<void> => {
  if (childUid <= 0 || !viewletId) {
    return
  }
  try {
    await RendererWorker.invoke(command, childUid, viewletId)
  } catch (error) {
    if (!isCommandNotFoundError(error)) {
      throw error
    }
  }
}
