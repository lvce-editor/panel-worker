import { expect, test } from '@jest/globals'
import { getPanelViews } from '../src/parts/GetPanelViews/GetPanelViews.ts'
import * as ViewletModuleId from '../src/parts/ViewletModuleId/ViewletModuleId.ts'

test('getPanelViews should return all panel views in the expected order', () => {
  expect(getPanelViews()).toEqual([ViewletModuleId.Problems, ViewletModuleId.Output, ViewletModuleId.DebugConsole, ViewletModuleId.Terminals])
})

test('getPanelViews should return a new array on every call', () => {
  const views1 = getPanelViews()
  const views2 = getPanelViews()

  expect(views1).toEqual(views2)
  expect(views1).not.toBe(views2)
})
