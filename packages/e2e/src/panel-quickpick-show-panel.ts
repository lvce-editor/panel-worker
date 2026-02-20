import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.quickpick-show-panel'

export const skip = 1

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  // Arrange
  await expect(Locator('.Panel')).toBeHidden()

  // Act
  await QuickPick.executeCommand('Layout: Toggle Panel')

  // Assert
  await expect(Locator('.Panel')).toBeVisible()
}
