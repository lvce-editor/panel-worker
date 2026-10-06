import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.reselect-terminals'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.open('Terminals')
  const tab = Locator('.PanelTab[name="Terminals"]')
  await expect(tab).toHaveAttribute('aria-selected', 'true')

  // Act
  await Panel.select('Terminals')

  // Assert
  await expect(tab).toHaveAttribute('aria-selected', 'true')
}
