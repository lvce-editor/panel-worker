import type { Test } from '@lvce-editor/test-worker'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.tab-list-accessibility'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Act
  await Panel.open('Problems')

  // Assert
  const tabList = Locator('.PanelTabs')
  await expect(tabList).toHaveAttribute('role', 'tablist')
}
