import type { PanelState } from '../../PanelState/PanelState.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'

export const selectRaw = async (state: PanelState, rawIndex: string): Promise<PanelState> => {
  return SelectIndex.selectIndex(state, Number.parseInt(rawIndex, 10))
}
