import { PlatformType } from '@lvce-editor/constants'
import type { PanelView } from '../PanelView/PanelView.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

const remoteSshWorkspacePrefix = 'remote-ssh://'
const devContainerWorkspacePrefix = 'devcontainers:///'
const codespacesWorkspacePrefix = 'codespaces://'

export const getPanelViews = (workspaceUri = '', platform = 0): readonly PanelView[] => {
  const views: PanelView[] = [ViewletModuleId.Problems, ViewletModuleId.Output, ViewletModuleId.DebugConsole, ViewletModuleId.Terminals].map(
    (id) => ({
      id,
      name: id,
      type: 'builtin',
    }),
  )
  if (platform === PlatformType.Web && !workspaceUri.startsWith('remote-server://')) {
    const index = views.findIndex((view) => view.id === ViewletModuleId.Terminals)
    views.splice(index, 1)
  }
  if (
    workspaceUri.startsWith(remoteSshWorkspacePrefix) ||
    workspaceUri.startsWith(devContainerWorkspacePrefix) ||
    workspaceUri.startsWith(codespacesWorkspacePrefix)
  ) {
    views.push({ id: ViewletModuleId.Ports, name: ViewletModuleId.Ports, type: 'builtin' })
  }
  return views
}
