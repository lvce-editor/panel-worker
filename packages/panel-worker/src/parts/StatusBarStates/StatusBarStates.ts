;`import * as ViewletRegistry from '@lvce-editor//viewlet-registry'
import type { PanelState } from '../PanelState/PanelState.ts'

export const { get, getCommandIds, registerCommands, set, wrapCommand, wrapGetter } = ViewletRegistry.create<PanelState>()
`
