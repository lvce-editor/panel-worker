import { PlatformType } from '@lvce-editor/constants'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

const remoteSshWorkspacePrefix = 'remote-ssh://'
const devContainerWorkspacePrefix = 'devcontainers:///'
const codespacesWorkspacePrefix = 'codespaces://'

export const getPanelViews = (workspaceUri = '', platform = 0): readonly string[] => {
  const views = [ViewletModuleId.Problems, ViewletModuleId.Output, ViewletModuleId.DebugConsole, ViewletModuleId.Terminals]
  if (platform === PlatformType.Web) {
    views.splice(views.indexOf(ViewletModuleId.Terminals), 1)
  }
  if (
    workspaceUri.startsWith(remoteSshWorkspacePrefix) ||
    workspaceUri.startsWith(devContainerWorkspacePrefix) ||
    workspaceUri.startsWith(codespacesWorkspacePrefix)
  ) {
    views.push(ViewletModuleId.Ports)
  }
  return views
}
