import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.tabs-displayed'

export const test: Test = async ({ expect, Locator, Panel }) => {
  // Act
  await Panel.openProblems()

  // Assert
  const tabs = Locator('.PanelTab')
  await expect(tabs).toHaveCount(4)
  const tabProblems = Locator('.PanelTab[name="Problems"]')
  await expect(tabProblems).toBeVisible()
  const tabOutput = Locator('.PanelTab[name="Output"]')
  await expect(tabOutput).toBeVisible()
  const tabDebugConsole = Locator('.PanelTab[name="Debug Console"]')
  await expect(tabDebugConsole).toBeVisible()
  const tabTerminals = Locator('.PanelTab[name="Terminals"]')
  await expect(tabTerminals).toBeVisible()
}
