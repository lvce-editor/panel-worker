import type { Test } from '@lvce-editor/test-worker'
import type { TestContext } from './TestContext.ts'

export const name = 'panel.show-debug-console-actions'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Act
  await Panel.open('Debug Console')

  // Assert
  const actions = Locator('.PanelHeader > .Actions')
  await expect(actions.locator('input[name="filter"]')).toBeVisible()
  await expect(actions.locator('button[title="Clear Console"]')).toBeVisible()
}
