import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.show-problems.extension-empty-array'

export const skip = 1

export const test: Test = async ({ expect, Locator, Panel }) => {
  // Arrange

  // Act
  await Panel.open('Problems')

  // Assert
  await expect(Locator('.Panel')).toBeVisible()
  await expect(Locator('.PanelTab[name="Problems"]')).toHaveAttribute('aria-selected', 'true')
}
