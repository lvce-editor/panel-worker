import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.reselect-debug-console'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.open('Debug Console')
  const tab = Locator('.PanelTab[name="Debug Console"]')
  await expect(tab).toHaveAttribute('aria-selected', 'true')

  // Act
  await Panel.select('Debug Console')

  // Assert
  await expect(tab).toHaveAttribute('aria-selected', 'true')
}
