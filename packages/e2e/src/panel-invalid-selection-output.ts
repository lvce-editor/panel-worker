import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.invalid-selection-output'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.open('Output')
  const tab = Locator('.PanelTab[name="Output"]')
  await expect(tab).toHaveAttribute('aria-selected', 'true')

  // Act
  await Panel.select('not-found')

  // Assert
  await expect(tab).toHaveAttribute('aria-selected', 'true')
}
