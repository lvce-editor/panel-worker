import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.show-invalid-id-stays-selected-tab'

export const skip = 1

export const test: Test = async ({ expect, Locator, Panel }) => {
  // Arrange
  await Panel.open('Output')
  const outputTab = Locator('.PanelTab[name="Output"]')
  await expect(outputTab).toHaveAttribute('aria-selected', 'true')

  // Act
  await Panel.open('Invalid')

  // Assert
  await expect(outputTab).toHaveAttribute('aria-selected', 'true')
}
