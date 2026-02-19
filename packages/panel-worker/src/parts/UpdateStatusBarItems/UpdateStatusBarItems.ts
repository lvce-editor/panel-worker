import type * as PanelState from '../PanelState/PanelState.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'

type State = PanelState.PanelState & {
  disposed?: boolean
}

export const updateStatusBarItems = async (state: Readonly<State>): Promise<State> => {
  const newState = await LoadContent.loadContent(state)
  return newState
}
