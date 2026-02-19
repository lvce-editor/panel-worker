import type { PanelState } from '../PanelState/PanelState.ts'
import { set } from '../PanelStates/PanelStates.ts'

export const create = (uid: number, uri: string, x: number, y: number, width: number, height: number, platform: number, assetDir: string): void => {
  const state: PanelState = {
    actionsUid: 0,
    assetDir,
    badgeCounts: {},
    childUid: 0,
    currentViewletId: '',
    errorCount: 0,
    initial: true,
    platform,
    selectedIndex: -1,
    uid,
    views: [],
    warningCount: 0,
  }
  set(uid, state, state)
}
