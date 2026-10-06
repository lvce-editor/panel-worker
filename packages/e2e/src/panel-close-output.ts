import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.close-output'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.open('Output')
  const panel = Locator('.Panel')
  await expect(panel).toBeVisible()

  // Act
  await Panel.close()

  // Assert
  await expect(panel).toBeHidden()
}
