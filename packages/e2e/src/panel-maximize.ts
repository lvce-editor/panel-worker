import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.maximize.extension-empty-array'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  // Arrange
  await Panel.openProblems()
  await expect(Locator('.Panel')).toBeVisible()

  // Act
  await Command.execute('Layout.maximizePanel')

  // Assert
  await expect(Locator('.Panel')).toBeVisible()
}
