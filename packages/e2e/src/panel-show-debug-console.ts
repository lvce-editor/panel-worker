import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.show-debug-console'

export const skip = 1

export const test: Test = async ({ expect, Locator, Panel }) => {
  // Arrange

  // Act
  await Panel.open('Debug Console')

  // Assert
  await expect(Locator('.Panel')).toBeVisible()
  await expect(Locator('.PanelTab[name="Debug Console"]')).toHaveAttribute('aria-selected', 'true')
}
