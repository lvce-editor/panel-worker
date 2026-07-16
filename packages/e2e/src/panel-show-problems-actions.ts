import type { Test } from '@lvce-editor/test-worker'
import type { TestContext } from './TestContext.ts'

export const name = 'panel.show-problems-actions'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Act
  await Panel.open('Problems')

  // Assert
  const actions = Locator('.PanelHeader > .Actions')
  await expect(actions.locator('input[name="filter"]')).toBeVisible()
  await expect(actions.locator('button[title="more filters"]')).toBeVisible()
  await expect(actions.locator('button[title="Collapse All"]')).toBeVisible()
  await expect(actions.locator('button[title="View as Table"]')).toBeVisible()
}
