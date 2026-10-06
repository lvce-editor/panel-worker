import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.toggle-view-debug-console'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.open('Problems')
  const fromTab = Locator('.PanelTab[name="Problems"]')
  const toTab = Locator('.PanelTab[name="Debug Console"]')
  await expect(fromTab).toHaveAttribute('aria-selected', 'true')

  // Act
  await Panel.toggleView('Debug Console')

  // Assert
  await expect(fromTab).toHaveAttribute('aria-selected', 'false')
  await expect(toTab).toHaveAttribute('aria-selected', 'true')
}
