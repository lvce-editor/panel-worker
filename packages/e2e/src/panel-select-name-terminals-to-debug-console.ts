import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.select-name-terminals-to-debug-console'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.open('Terminals')
  const fromTab = Locator('.PanelTab[name="Terminals"]')
  const toTab = Locator('.PanelTab[name="Debug Console"]')
  await expect(fromTab).toHaveAttribute('aria-selected', 'true')

  // Act
  await Panel.select('Debug Console')

  // Assert
  await expect(fromTab).toHaveAttribute('aria-selected', 'false')
  await expect(toTab).toHaveAttribute('aria-selected', 'true')
}
