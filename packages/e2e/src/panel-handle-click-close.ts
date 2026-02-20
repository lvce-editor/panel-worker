import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.handle-click-close'

export const skip = 1

export const test: Test = async ({ expect, Locator, Panel }) => {
  // Arrange
  await Panel.openProblems()

  const closeButton = Locator('.Panel .IconButton[title="Close"]')
  await expect(closeButton).toBeVisible()

  // Act
  await closeButton.click()

  // Assert
  await expect(Locator('.Panel')).toBeHidden()
}
