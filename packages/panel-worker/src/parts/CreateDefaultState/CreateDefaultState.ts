import type { PanelState } from '../PanelState/PanelState.ts'

export const createDefaultState = (): PanelState => {
  return {
    assetDir: '',
    errorCount: 0,
    initial: true,
    platform: 0,
    uid: 0,
    warningCount: 0,
  }
}
