import type { PanelView } from '../PanelView/PanelView.ts'
import type { Tab } from '../Tab/Tab.ts'

export interface PanelState {
  readonly actionsUid: number
  readonly applicationId?: string
  readonly assetDir: string
  readonly availableViews: readonly PanelView[]
  readonly badgeCounts: Readonly<Record<string, number>>
  readonly childUid: number
  readonly currentViewletId: string
  readonly errorCount: number
  readonly headerHeight: number
  readonly height: number
  readonly hiddenViews: readonly string[]
  readonly initial: boolean
  readonly maximized: boolean
  readonly platform: number
  readonly selectedIndex: number
  readonly tabs: readonly Tab[]
  readonly uid: number
  readonly views: readonly PanelView[]
  readonly warningCount: number
  readonly width: number
  readonly x: number
  readonly y: number
}
