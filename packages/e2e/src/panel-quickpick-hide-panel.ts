import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './TestContext.ts'

export const name = 'panel.quickpick-hide-panel'

export const skip = 1

export const test: Test = async ({ expect, Locator, Panel, QuickPick }: TestContext) => {
  // Arrange
  const panel = Locator('.Panel')
  await Panel.openProblems()
  await expect(panel).toBeVisible()

  // Act
  await QuickPick.executeCommand('Layout: Toggle Panel')

  // Assert
  await expect(panel).toBeHidden()
}
