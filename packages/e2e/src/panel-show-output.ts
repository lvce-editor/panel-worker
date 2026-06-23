import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.show-output'

export const skip = 1

export const test: Test = async ({ expect, Locator, Panel }) => {
  // Arrange
  const panel = Locator('.Panel')
  const outputTab = Locator('.PanelTab[name="Output"]')

  // Act
  await Panel.open('Output')

  // Assert
  await expect(panel).toBeVisible()
  await expect(outputTab).toHaveAttribute('aria-selected', 'true')
}
