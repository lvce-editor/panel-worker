import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.show-output-actions'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Act
  await Panel.open('Output')

  // Assert
  const actions = Locator('.PanelHeader > .Actions')
  const filterInput = actions.locator('input[name="filter"]')
  const outputSelect = actions.locator('select[name="output"]')
  const clearOutputButton = actions.locator('button[title="clear output"]')
  const autoScrollButton = actions.locator('button[title="Turn auto scrolling off"]')
  const settingsButton = actions.locator('button[title="Settings"]')
  await expect(filterInput).toBeVisible()
  await expect(outputSelect).toBeVisible()
  await expect(clearOutputButton).toBeVisible()
  await expect(autoScrollButton).toBeVisible()
  await expect(settingsButton).toBeVisible()
}
