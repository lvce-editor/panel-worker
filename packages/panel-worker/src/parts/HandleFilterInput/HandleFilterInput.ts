import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { PanelState } from '../../PanelState/PanelState.ts'
import * as Assert from '../../Assert/Assert.ts'

export const handleFilterInput = async (state: PanelState, value: string): Promise<PanelState> => {
  Assert.object(state)
  Assert.string(value)
  const { currentViewletId } = state
  const fullCommand = `${currentViewletId}.handleFilterInput`
  await RendererWorker.invoke(fullCommand, value)
  return state
}
