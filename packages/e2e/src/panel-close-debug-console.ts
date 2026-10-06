import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.close-debug-console'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.open('Debug Console')
  const panel = Locator('.Panel')
  await expect(panel).toBeVisible()

  // Act
  await Panel.close()

  // Assert
  await expect(panel).toBeHidden()
}
