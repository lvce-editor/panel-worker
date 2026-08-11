import type { PanelState } from '../PanelState/PanelState.ts'
import { setBadgeCount } from '../SetBadgeCount/SetBadgeCount.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

interface ProblemsSummary {
  readonly hasEditor: boolean
  readonly problemCount: number
}

export const handleProblemsSummaryChange = (state: PanelState, summary: ProblemsSummary): PanelState => {
  const count = summary.hasEditor ? summary.problemCount : 0
  if (state.badgeCounts[ViewletModuleId.Problems] === count) {
    return state
  }
  return setBadgeCount(state, ViewletModuleId.Problems, count)
}
