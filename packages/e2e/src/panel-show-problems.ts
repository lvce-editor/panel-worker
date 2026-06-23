import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './TestContext.ts'

export const name = 'panel.show-problems'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Act
  await Panel.open('Problems')

  // Assert
  const panel = Locator('.Panel')
  await expect(panel).toBeVisible()
  const panelTab = Locator('.PanelTab[name="Problems"]')
  await expect(panelTab).toHaveAttribute('aria-selected', 'true')
}
