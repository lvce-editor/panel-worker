import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.quickpick-hide-panel'

export const skip = 1

export const test: Test = async ({ expect, Locator, Panel, QuickPick }) => {
  // Arrange
  await Panel.openProblems()
  await expect(Locator('.Panel')).toBeVisible()

  // Act
  await QuickPick.executeCommand('Layout: Toggle Panel')

  // Assert
  await expect(Locator('.Panel')).toBeHidden()
}
