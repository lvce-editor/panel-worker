import type { PanelView } from '../src/parts/PanelView/PanelView.ts'

export const createPanelView = (id: Readonly<string>, name: Readonly<string> = id, type: Readonly<PanelView['type']> = 'builtin'): PanelView => ({
  id,
  name,
  type,
})

export const createPanelViews = (...ids: readonly string[]): readonly PanelView[] => ids.map((id) => createPanelView(id))
