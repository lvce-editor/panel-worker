import type { Test } from '@lvce-editor/test-worker'
import type { TestContext } from './TestContext.ts'

export const name = 'panel.show-terminals-actions'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Act
  await Panel.open('Terminals')

  // Assert
  const actions = Locator('.PanelHeader > .Actions')
  await expect(actions.locator('button[title="New Terminal"]')).toBeVisible()
  await expect(actions.locator('button[title="Split Terminal"]')).toBeVisible()
  await expect(actions.locator('button[title="Kill Terminal"]')).toBeVisible()
}
