import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.reselect-problems'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.open('Problems')
  const tab = Locator('.PanelTab[name="Problems"]')
  await expect(tab).toHaveAttribute('aria-selected', 'true')

  // Act
  await Panel.select('Problems')

  // Assert
  await expect(tab).toHaveAttribute('aria-selected', 'true')
}
