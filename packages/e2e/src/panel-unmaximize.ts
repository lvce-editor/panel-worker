import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './TestContext.ts'

export const name = 'panel.unmaximize'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator, Panel }: TestContext) => {
  // Arrange
  const panel = Locator('.Panel')
  await Panel.openProblems()
  await Command.execute('Layout.maximizePanel')

  // Act
  await Command.execute('Layout.unmaximizePanel')

  // Assert
  await expect(panel).toBeVisible()
}
