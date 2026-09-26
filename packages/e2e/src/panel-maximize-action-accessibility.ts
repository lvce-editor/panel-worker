import type { Test } from '@lvce-editor/test-worker'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.maximize-action-accessibility'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Act
  await Panel.open('Problems')

  // Assert
  const maximizeButton = Locator('button[aria-label="Maximize"]')
  await expect(maximizeButton).toBeVisible()
  await expect(maximizeButton).toHaveAttribute('title', 'Maximize')
}
