import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.show-debug-console-actions'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Act
  await Panel.open('Debug Console')

  // Assert
  const actions = Locator('.PanelHeader > .Actions')
  const filterInput = actions.locator('input[name="filter"]')
  const clearConsoleButton = actions.locator('button[title="Clear Console"]')
  await expect(filterInput).toBeVisible()
  await expect(clearConsoleButton).toBeVisible()
}
