import type { Test } from '@lvce-editor/test-with-playwright'
import type { TestContext } from './TestContext.ts'

export const name = 'panel.show-invalid-id-stays-selected-tab'

export const test: Test = async ({ Command, expect, Locator, Panel }: TestContext) => {
  // Arrange
  await Panel.open('Problems')
  const problemsTab = Locator('.PanelTab[name="Problems"]')
  await expect(problemsTab).toHaveAttribute('aria-selected', 'true')

  // Act
  await Command.execute('Panel.selectName', 'not-found')

  // Assert
  await expect(problemsTab).toHaveAttribute('aria-selected', 'true')
}
