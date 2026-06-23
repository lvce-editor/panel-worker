import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './TestContext.ts'

export const name = 'panel.quickpick-show-panel'

export const skip = 1

export const test: Test = async ({ expect, Locator, QuickPick }: TestContext) => {
  // Arrange
  const panel = Locator('.Panel')
  await expect(panel).toBeHidden()

  // Act
  await QuickPick.executeCommand('Layout: Toggle Panel')

  // Assert
  await expect(panel).toBeVisible()
}
