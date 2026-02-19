import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { PanelState } from '../PanelState/PanelState.ts'

export const handleClickMaximize = async (state: PanelState): Promise<PanelState> => {
  await RendererWorker.invoke('Layout.maximizePanel')
  return state
}
