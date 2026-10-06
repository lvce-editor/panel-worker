import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.show-problems-actions'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Act
  await Panel.open('Problems')

  // Assert
  const actions = Locator('.PanelHeader > .Actions')
  const collapseAllButton = actions.locator('button[title="Collapse All"]')
  const viewAsTableButton = actions.locator('button[title="View as Table"]')
  await expect(collapseAllButton).toBeVisible()
  await expect(viewAsTableButton).toBeVisible()
}
