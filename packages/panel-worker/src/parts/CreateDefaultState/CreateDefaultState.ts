import type { PanelState } from '../PanelState/PanelState.ts'

export const createDefaultState = (): PanelState => {
  return {
    actionsUid: 0,
    assetDir: '',
    badgeCounts: {},
    childUid: 0,
    errorCount: 0,
    height: 0,
    initial: true,
    platform: 0,
    selectedIndex: -1,
    uid: 0,
    views: [],
    warningCount: 0,
    width: 0,
    x: 0,
    y: 0,
  }
}
