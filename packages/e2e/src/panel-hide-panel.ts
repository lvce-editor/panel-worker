import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.hide-panel'

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  // Arrange
  await Panel.openProblems()
  const panel = Locator('.Panel')
  await expect(panel).toBeVisible()

  // Act
  await Command.execute('Layout.hidePanel')

  // Assert
  await expect(panel).toBeHidden()
}
