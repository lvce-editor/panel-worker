import type { Test } from '@lvce-editor/test-worker'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.hide-panel'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.openProblems()
  const panel = Locator('.Panel')
  await expect(panel).toBeVisible()

  // Act
  await Panel.hide()

  // Assert
  await expect(panel).toBeHidden()
}
