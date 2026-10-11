import { expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { getPanelViews } from '../src/parts/GetPanelViews/GetPanelViews.ts'
import * as ViewletModuleId from '../src/parts/ViewletModuleId/ViewletModuleId.ts'

test('getPanelViews should omit Ports for local workspaces', () => {
  expect(getPanelViews()).toEqual([ViewletModuleId.Problems, ViewletModuleId.Output, ViewletModuleId.DebugConsole, ViewletModuleId.Terminals])
})

test('getPanelViews should include Ports for remote ssh workspaces', () => {
  expect(getPanelViews('remote-ssh://host/workspace')).toEqual([
    ViewletModuleId.Problems,
    ViewletModuleId.Output,
    ViewletModuleId.DebugConsole,
    ViewletModuleId.Terminals,
    ViewletModuleId.Ports,
  ])
})

test('getPanelViews should omit Terminals on web', () => {
  expect(getPanelViews('', PlatformType.Web)).toEqual([ViewletModuleId.Problems, ViewletModuleId.Output, ViewletModuleId.DebugConsole])
})

test('getPanelViews should omit Terminals and include Ports for remote ssh workspaces on web', () => {
  expect(getPanelViews('remote-ssh://host/workspace', PlatformType.Web)).toEqual([
    ViewletModuleId.Problems,
    ViewletModuleId.Output,
    ViewletModuleId.DebugConsole,
    ViewletModuleId.Ports,
  ])
})

test.each(['file:///workspace'])('getPanelViews should omit Ports for %s workspaces', (workspaceUri) => {
  expect(getPanelViews(workspaceUri)).not.toContain(ViewletModuleId.Ports)
})

test('getPanelViews should return a new array on every call', () => {
  const views1 = getPanelViews()
  const views2 = getPanelViews()

  expect(views1).toEqual(views2)
  expect(views1).not.toBe(views2)
})

test('getPanelViews includes Ports for Codespaces workspaces', () => {
  expect(getPanelViews('codespaces://happy-cat/workspaces/project')).toContain(ViewletModuleId.Ports)
})
