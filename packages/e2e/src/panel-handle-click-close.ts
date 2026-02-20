import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.handle-click-close'

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  // Arrange
  await Panel.openProblems()

  // Act
  await Command.execute('Panel.handleClickClose')

  // Assert
  const panel = Locator('.Panel')
  await expect(panel).toBeHidden()
}
