import type { Test } from '@lvce-editor/test-worker'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.global-actions-accessibility'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Act
  await Panel.open('Problems')

  // Assert
  const toolbar = Locator('.PanelToolBar')
  await expect(toolbar).toHaveAttribute('role', 'toolbar')
}
