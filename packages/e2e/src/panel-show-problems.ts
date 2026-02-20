import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.show-problems'

export const test: Test = async ({ expect, Locator, Panel }) => {
  // Act
  await Panel.open('Problems')

  // Assert
  const panel = Locator('.Panel')
  await expect(panel).toBeVisible()
  const panelTab = Locator('.PanelTab[name="Problems"]')
  await expect(panelTab).toHaveAttribute('aria-selected', 'true')
}
