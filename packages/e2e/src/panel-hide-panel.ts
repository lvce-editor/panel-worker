import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.hide-panel'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  // Arrange
  await Panel.openProblems()
  await expect(Locator('.Panel')).toBeVisible()

  // Act
  await Command.execute('Layout.hidePanel')

  // Assert
  await expect(Locator('.Panel')).toBeHidden()
}
