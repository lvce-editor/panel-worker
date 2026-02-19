export interface PanelState {
  readonly actionsUid: number
  readonly assetDir: string
  readonly childUid: number
  readonly disposed?: boolean
  readonly errorCount: number
  readonly initial: boolean
  readonly platform: number
  readonly uid: number
  readonly warningCount: number
}
