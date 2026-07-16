import type { Test } from '@lvce-editor/test-worker'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.show-panel'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator }: TestContext) => {
  // Arrange

  // Act
  await Command.execute('Layout.showPanel', 'Problems')

  // Assert
  const panel = Locator('.Panel')
  await expect(panel).toBeVisible()
}
