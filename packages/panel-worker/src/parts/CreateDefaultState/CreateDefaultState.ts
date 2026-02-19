import type { PanelState } from '../PanelState/PanelState.ts'

export const createDefaultState = (): PanelState => {
  return {
    actionsUid: 0,
    assetDir: '',
    badgeCounts: {},
    childUid: 0,
    currentViewletId: '',
    errorCount: 0,
    initial: true,
    platform: 0,
    selectedIndex: -1,
    uid: 0,
    views: [],
    warningCount: 0,
  }
}
