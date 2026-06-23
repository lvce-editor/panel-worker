import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './TestContext.ts'

export const name = 'panel.hide-panel'

export const test: Test = async ({ Command, expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.openProblems()
  const panel = Locator('.Panel')
  await expect(panel).toBeVisible()

  // Act
  await Command.execute('Layout.hidePanel')

  // Assert
  await expect(panel).toBeHidden()
}
