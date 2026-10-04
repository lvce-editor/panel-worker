import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

const remoteSshWorkspacePrefix = 'remote-ssh://'
const devContainerWorkspacePrefix = 'devcontainers:///'

export const getPanelViews = (workspaceUri = ''): readonly string[] => {
  const views = [ViewletModuleId.Problems, ViewletModuleId.Output, ViewletModuleId.DebugConsole, ViewletModuleId.Terminals]
  if (workspaceUri.startsWith(remoteSshWorkspacePrefix) || workspaceUri.startsWith(devContainerWorkspacePrefix)) {
    views.push(ViewletModuleId.Ports)
  }
  return views
}
