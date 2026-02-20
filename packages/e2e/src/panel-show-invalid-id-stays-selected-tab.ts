import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.show-invalid-id-stays-selected-tab'

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  // Arrange
  await Panel.open('Problems')
  const problemsTab = Locator('.PanelTab[name="Problems"]')
  await expect(problemsTab).toHaveAttribute('aria-selected', 'true')

  // Act
  await Command.execute('Panel.selectName', 'not-found')

  // Assert
  await expect(problemsTab).toHaveAttribute('aria-selected', 'true')
}
