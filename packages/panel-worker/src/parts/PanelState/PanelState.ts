export interface PanelState {
  readonly assetDir: string
  readonly disposed?: boolean
  readonly errorCount: number
  readonly initial: boolean
  readonly platform: number
  readonly uid: number
  readonly warningCount: number
}
