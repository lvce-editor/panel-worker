import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './TestContext.ts'

export const name = 'panel.show-terminals'

export const skip = 1

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Arrange
  const panel = Locator('.Panel')
  const terminalsTab = Locator('.PanelTab[name="Terminals"]')

  // Act
  await Panel.open('Terminals')

  // Assert
  await expect(panel).toBeVisible()
  await expect(terminalsTab).toHaveAttribute('aria-selected', 'true')
}
