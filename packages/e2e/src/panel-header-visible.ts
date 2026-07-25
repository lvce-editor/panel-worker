import type { Test } from '@lvce-editor/test-worker'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.header-visible'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Act
  await Panel.open('Problems')

  // Assert
  const header = Locator('.PanelHeader')
  await expect(header).toBeVisible()
}
