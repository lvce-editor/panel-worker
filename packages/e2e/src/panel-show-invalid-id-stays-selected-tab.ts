import type { Test } from '@lvce-editor/test-worker'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.show-invalid-id-stays-selected-tab'

export const test: Test = async ({ expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.open('Problems')
  const problemsTab = Locator('.PanelTab[name="Problems"]')
  await expect(problemsTab).toHaveAttribute('aria-selected', 'true')

  // Act
  await Panel.select('not-found')

  // Assert
  await expect(problemsTab).toHaveAttribute('aria-selected', 'true')
}
