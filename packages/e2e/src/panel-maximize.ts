import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './TestContext.ts'

export const name = 'panel.maximize'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator, Panel }: TestContext) => {
  // Arrange
  const panel = Locator('.Panel')
  await Panel.openProblems()
  await expect(panel).toBeVisible()

  // Act
  await Command.execute('Layout.maximizePanel')

  // Assert
  await expect(panel).toBeVisible()
}
