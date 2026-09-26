import type { Test } from '@lvce-editor/test-worker'
import type { TestContext } from './_TestContext.ts'

export const name = 'panel.problems-badge-updates'

const updateProblemsSummary = async (Command: TestContext['Command'], problemCount: number): Promise<void> => {
  await Command.execute('Panel.handleProblemsSummaryChange', {
    errorCount: problemCount,
    hasEditor: true,
    problemCount,
    warningCount: 0,
  })
}

export const test: Test = async ({ Command, expect, Locator, Panel }: TestContext) => {
  await Panel.open('Problems')
  const problemsTab = Locator('.PanelTab[name="Problems"]')
  const badge = problemsTab.locator('.Badge')

  await updateProblemsSummary(Command, 3)
  await expect(badge).toHaveText(' 3')

  await updateProblemsSummary(Command, 2)
  await expect(badge).toHaveText(' 2')

  await updateProblemsSummary(Command, 0)
  await expect(badge).toHaveCount(0)
}
