import type * as PanelState from '../PanelState/PanelState.ts'
import * as ExtensionHostStatusBarItems from '../ExtensionHost/ExtensionHostStatusBarItems.ts'
import * as UpdateStatusBarItems from '../UpdateStatusBarItems/UpdateStatusBarItems.ts'

type State = PanelState.PanelState & {
  disposed?: boolean
}

export const contentLoadedEffects = (state: Readonly<State>): void => {
  // TODO dispose listener
  const handleChange = async (): Promise<void> => {
    if (state.disposed) {
      return
    }
    await UpdateStatusBarItems.updateStatusBarItems(state)
  }
  // maybe return cleanup function from here like react hooks
  void ExtensionHostStatusBarItems.onChange(handleChange)
}
