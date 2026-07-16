import type { Test } from '@lvce-editor/test-worker'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.show-output-actions'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Act
  await Panel.open('Output')

  // Assert
  const actions = Locator('.PanelHeader > .Actions')
  await expect(actions.locator('input[name="filter"]')).toBeVisible()
  await expect(actions.locator('select[name="output"]')).toBeVisible()
  await expect(actions.locator('button[title="clear output"]')).toBeVisible()
  await expect(actions.locator('button[title="Turn auto scrolling off"]')).toBeVisible()
  await expect(actions.locator('button[title="Settings"]')).toBeVisible()
}
