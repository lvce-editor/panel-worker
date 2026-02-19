import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const getPanelViews = (): readonly string[] => {
  const views = [ViewletModuleId.Problems, ViewletModuleId.Output, ViewletModuleId.DebugConsole, ViewletModuleId.Terminals]
  return views
}
