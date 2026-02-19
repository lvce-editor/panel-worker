import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { PanelState } from '../PanelState/PanelState.ts'

export const resize = async (state: PanelState, dimensions: any): Promise<PanelState> => {
  const { childUid } = state
  // TODO
  const currentViewletInstance = {}
  const newState = {
    ...state,
    ...dimensions,
  }
  if (!currentViewletInstance) {
    return {
      ...newState,
    }
  }
  // @ts-ignore
  const commands = await RendererWorker.invoke('Viewlet.resize', childUid, dimensions)
  return {
    ...newState,
  }
}
