import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.tab-context-menu'

export const test: Test = async ({ Command, ContextMenu, expect, Locator, Panel }) => {
  await Panel.openProblems()

  const problemsTab = Locator('.PanelTab[name="Problems"]')
  await expect(problemsTab).toBeVisible()

  await Command.execute('Panel.handleTabContextMenu', 2, 10, 20)

  const outputMenuItem = Locator('.MenuItem[role="menuitemcheckbox"]:has-text("Output")')
  await expect(outputMenuItem).toHaveAttribute('aria-checked', 'true')
  await ContextMenu.selectItem('Output')
  const outputTab = Locator('.PanelTab[name="Output"]')
  await expect(outputTab).toHaveCount(0)

  await Command.execute('Panel.handleTabContextMenu', 2, 10, 20)
  await ContextMenu.selectItem('Output')
  const restoredOutputTab = Locator('.PanelTab[name="Output"]')
  await expect(restoredOutputTab).toBeVisible()
}
