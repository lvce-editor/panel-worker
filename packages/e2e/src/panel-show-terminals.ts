import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.show-terminals'

export const skip = 1

export const test: Test = async ({ expect, Locator, Panel }) => {
  // Arrange

  // Act
  await Panel.open('Terminals')

  // Assert
  await expect(Locator('.Panel')).toBeVisible()
  await expect(Locator('.PanelTab[name="Terminals"]')).toHaveAttribute('aria-selected', 'true')
}
