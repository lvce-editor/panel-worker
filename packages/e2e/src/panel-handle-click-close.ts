import type { Test } from '@lvce-editor/test-worker'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.handle-click-close'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.openProblems()

  // Act
  await Panel.close()

  // Assert
  const panel = Locator('.Panel')
  await expect(panel).toBeHidden()
}
