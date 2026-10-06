import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.show-terminals-actions'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Act
  await Panel.open('Terminals')

  // Assert
  const actions = Locator('.PanelHeader > .Actions')
  const newTerminalButton = actions.locator('button[title="New Terminal"]')
  const splitTerminalButton = actions.locator('button[title="Split Terminal"]')
  const killTerminalButton = actions.locator('button[title="Kill Terminal"]')
  await expect(newTerminalButton).toBeVisible()
  await expect(splitTerminalButton).toBeVisible()
  await expect(killTerminalButton).toBeVisible()
}
