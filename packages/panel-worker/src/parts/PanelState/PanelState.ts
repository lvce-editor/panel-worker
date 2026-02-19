import type { Tab } from '../Tab/Tab.ts'

export interface PanelState {
  readonly actionsUid: number
  readonly assetDir: string
  readonly badgeCounts: any
  readonly childUid: number
  readonly currentViewletId: string
  readonly errorCount: number
  readonly height: number
  readonly initial: boolean
  readonly platform: number
  readonly selectedIndex: number
  readonly tabs: readonly Tab[]
  readonly uid: number
  readonly views: readonly string[]
  readonly warningCount: number
  readonly width: number
  readonly x: number
  readonly y: number
}
