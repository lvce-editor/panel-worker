import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.show-panel'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator }) => {
  // Arrange

  // Act
  await Command.execute('Layout.showPanel', 'Problems')

  // Assert
  const panel = Locator('.Panel')
  await expect(panel).toBeVisible()
}
