import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.unmaximize.extension-empty-array'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  // Arrange
  await Panel.openProblems()
  await Command.execute('Layout.maximizePanel')

  // Act
  await Command.execute('Layout.unmaximizePanel')

  // Assert
  await expect(Locator('.Panel')).toBeVisible()
}
