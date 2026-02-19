import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { PanelState } from '../../PanelState/PanelState.ts'

export const handleClickClose = async (state: PanelState): Promise<PanelState> => {
  await RendererWorker.invoke('Layout.hidePanel')
  return state
}
