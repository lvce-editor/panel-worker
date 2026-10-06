import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.select-name-problems-to-terminals'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.open('Problems')
  const fromTab = Locator('.PanelTab[name="Problems"]')
  const toTab = Locator('.PanelTab[name="Terminals"]')
  await expect(fromTab).toHaveAttribute('aria-selected', 'true')

  // Act
  await Panel.select('Terminals')

  // Assert
  await expect(fromTab).toHaveAttribute('aria-selected', 'false')
  await expect(toTab).toHaveAttribute('aria-selected', 'true')
}
