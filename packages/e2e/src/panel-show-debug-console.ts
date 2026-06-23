import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './TestContext.ts'

export const name = 'panel.show-debug-console'

export const skip = 1

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Arrange
  const panel = Locator('.Panel')
  const debugConsoleTab = Locator('.PanelTab[name="Debug Console"]')

  // Act
  await Panel.open('Debug Console')

  // Assert
  await expect(panel).toBeVisible()
  await expect(debugConsoleTab).toHaveAttribute('aria-selected', 'true')
}
