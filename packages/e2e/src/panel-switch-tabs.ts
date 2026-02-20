import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'panel.switch-tabs'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator, Panel }) => {
  // Arrange
  await Panel.openProblems()
  const problemsTab = Locator('.PanelTab[name="Problems"]')
  const outputTab = Locator('.PanelTab[name="Output"]')
  await expect(problemsTab).toHaveAttribute('aria-selected', 'true')

  // Act
  await Command.execute('Panel.selectName', 'Output')

  // Assert
  await expect(outputTab).toHaveAttribute('aria-selected', 'true')
  await expect(problemsTab).toHaveAttribute('aria-selected', 'false')
}
