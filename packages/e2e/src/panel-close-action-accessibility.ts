import type { Test } from '@lvce-editor/test-worker'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.close-action-accessibility'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Act
  await Panel.open('Problems')

  // Assert
  const closeButton = Locator('button[aria-label="Close"]')
  await expect(closeButton).toBeVisible()
  await expect(closeButton).toHaveAttribute('title', 'Close')
}
