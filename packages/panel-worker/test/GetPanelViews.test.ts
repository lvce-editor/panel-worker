import { expect, test } from '@jest/globals'
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

test.each(['file:///workspace', 'codespaces://workspace', 'devcontainers:///workspace'])(
  'getPanelViews should omit Ports for %s workspaces',
  (workspaceUri) => {
    expect(getPanelViews(workspaceUri)).not.toContain(ViewletModuleId.Ports)
  },
)

test('getPanelViews should return a new array on every call', () => {
  const views1 = getPanelViews()
  const views2 = getPanelViews()

  expect(views1).toEqual(views2)
  expect(views1).not.toBe(views2)
})
