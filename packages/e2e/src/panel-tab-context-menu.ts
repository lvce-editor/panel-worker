import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.tab-context-menu'

// The consuming renderer must register this panel worker's menu APIs before this test can run.
export const skip = 1

export const test: Test = async ({ ContextMenu, expect, Locator, Panel }) => {
  await Panel.openProblems()

  const problemsTab = Locator('.PanelTab[name="Problems"]')
  await expect(problemsTab).toBeVisible()

  // The test worker does not expose a right-click helper yet.
  // eslint-disable-next-line e2e/no-direct-click, @typescript-eslint/no-deprecated -- the test worker has no right-click helper
  await problemsTab.click({ button: 'right' })

  await ContextMenu.selectItem('Output')
  const outputTab = Locator('.PanelTab[name="Output"]')
  await expect(outputTab).toHaveCount(0)

  // eslint-disable-next-line e2e/no-direct-click, @typescript-eslint/no-deprecated -- the test worker has no right-click helper
  await problemsTab.click({ button: 'right' })
  await ContextMenu.selectItem('Output')
  const restoredOutputTab = Locator('.PanelTab[name="Output"]')
  await expect(restoredOutputTab).toBeVisible()
}
