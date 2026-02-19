import type { PanelState } from '../PanelState/PanelState.ts'
import { set } from '../PanelStates/PanelStates.ts'

export const create = (uid: number, uri: string, x: number, y: number, width: number, height: number, platform: number, assetDir: string): void => {
  const state: PanelState = {
    actionsUid: 0,
    assetDir,
    badgeCounts: {},
    childUid: 0,
    errorCount: 0,
    initial: true,
    platform,
    selectedIndex: -1,
    uid,
    views: [],
    warningCount: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }
  set(uid, state, state)
}
