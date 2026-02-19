import type { PanelState } from '../PanelState/PanelState.ts'
import { set } from '../PanelStates/PanelStates.ts'

export const create = (uid: number, uri: string, x: number, y: number, width: number, height: number, platform: number, assetDir: string): void => {
  const state: PanelState = {
    assetDir,
    errorCount: 0,
    initial: true,
    platform,
    statusBarItemsLeft: [],
    statusBarItemsRight: [],
    uid,
    warningCount: 0,
  }
  set(uid, state, state)
}
