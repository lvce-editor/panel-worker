import type { PanelState } from '../PanelState/PanelState.ts'

export const setBadgeCount = (state: PanelState, id: string, count: number): PanelState => {
  const { badgeCounts } = state
  return {
    ...state,
    badgeCounts: {
      ...badgeCounts,
      [id]: count,
    },
  }
}
