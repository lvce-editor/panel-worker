import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

const remoteSshWorkspacePrefix = 'remote-ssh://'
const devContainerWorkspacePrefix = 'devcontainers:///'
const codespacesWorkspacePrefix = 'codespaces://'

export const getPanelViews = (workspaceUri = ''): readonly string[] => {
  const views = [ViewletModuleId.Problems, ViewletModuleId.Output, ViewletModuleId.DebugConsole, ViewletModuleId.Terminals]
  if (
    workspaceUri.startsWith(remoteSshWorkspacePrefix) ||
    workspaceUri.startsWith(devContainerWorkspacePrefix) ||
    workspaceUri.startsWith(codespacesWorkspacePrefix)
  ) {
    views.push(ViewletModuleId.Ports)
  }
  return views
}
