export interface PanelView {
  readonly id: string
  readonly name: string
  readonly type: 'builtin' | 'extension'
}
