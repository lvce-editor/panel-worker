import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './TestContext.ts'

export const name = 'panel.handle-click-close'

export const test: Test = async ({ Command, expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.openProblems()

  // Act
  await Command.execute('Panel.handleClickClose')

  // Assert
  const panel = Locator('.Panel')
  await expect(panel).toBeHidden()
}
