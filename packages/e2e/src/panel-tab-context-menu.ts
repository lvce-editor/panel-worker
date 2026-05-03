import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.tab-context-menu'

export const test: Test = async ({ expect, Locator, Panel }) => {
  await Panel.openProblems()

  const problemsTab = Locator('.PanelTab[name="Problems"]')
  await expect(problemsTab).toBeVisible()

  await problemsTab.click({
    button: 'right',
  })

  const maximizePanel = Locator('text=Maximize Panel')
  await expect(maximizePanel).toBeVisible()

  const hidePanel = Locator('text=Hide Panel')
  await expect(hidePanel).toBeVisible()
}
