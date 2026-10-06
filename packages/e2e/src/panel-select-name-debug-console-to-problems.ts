import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.select-name-debug-console-to-problems'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.open('Debug Console')
  const fromTab = Locator('.PanelTab[name="Debug Console"]')
  const toTab = Locator('.PanelTab[name="Problems"]')
  await expect(fromTab).toHaveAttribute('aria-selected', 'true')

  // Act
  await Panel.select('Problems')

  // Assert
  await expect(fromTab).toHaveAttribute('aria-selected', 'false')
  await expect(toTab).toHaveAttribute('aria-selected', 'true')
}
