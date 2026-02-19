import * as Diff from '../Diff/Diff.ts'
import * as PanelStates from '../PanelStates/PanelStates.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { newState, oldState } = PanelStates.get(uid)
  const result = Diff.diff(oldState, newState)
  return result
}
