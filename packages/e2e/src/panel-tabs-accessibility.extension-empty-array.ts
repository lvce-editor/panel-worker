import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.tabs-accessibility.extension-empty-array'

export const skip = 1

export const test: Test = async ({ expect, Locator, Panel }) => {
  // Arrange
  await Panel.openProblems()

  // Act
  const tabs = Locator('.PanelTab')

  // Assert
  await expect(tabs).toHaveCount(4)

  for (let i = 0; i < 4; i++) {
    await expect(tabs.nth(i)).toHaveAttribute('role', 'tab')
  }
}
