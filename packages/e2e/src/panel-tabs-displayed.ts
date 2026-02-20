import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.tabs-displayed'

export const skip = 1

export const test: Test = async ({ expect, Locator, Panel }) => {
  // Arrange
  await Panel.openProblems()

  // Act
  const tabs = Locator('.PanelTab')

  // Assert
  await expect(tabs).toHaveCount(4)

  await expect(Locator('.PanelTab[name="Problems"]')).toBeVisible()
  await expect(Locator('.PanelTab[name="Output"]')).toBeVisible()
  await expect(Locator('.PanelTab[name="Debug Console"]')).toBeVisible()
  await expect(Locator('.PanelTab[name="Terminals"]')).toBeVisible()
}
