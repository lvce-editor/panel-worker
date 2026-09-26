import type { Test } from '@lvce-editor/test-worker'
import type { TestContext } from './_TestContext.ts'

export type PanelName = 'Debug Console' | 'Output' | 'Problems' | 'Terminals'

const getTab = (Locator: TestContext['Locator'], name: PanelName): ReturnType<TestContext['Locator']> => {
  return Locator(`.PanelTab[name="${name}"]`)
}

export const createSelectNameTest = (from: PanelName, to: PanelName): Test => {
  return async ({ Command, expect, Locator, Panel }: TestContext) => {
    // Arrange
    await Panel.open(from)
    const fromTab = getTab(Locator, from)
    const toTab = getTab(Locator, to)
    await expect(fromTab).toHaveAttribute('aria-selected', 'true')

    // Act
    await Command.execute('Panel.selectName', to)

    // Assert
    await expect(fromTab).toHaveAttribute('aria-selected', 'false')
    await expect(toTab).toHaveAttribute('aria-selected', 'true')
  }
}

export const createCloseTest = (view: PanelName): Test => {
  return async ({ Command, expect, Locator, Panel }: TestContext) => {
    // Arrange
    await Panel.open(view)
    const panel = Locator('.Panel')
    await expect(panel).toBeVisible()

    // Act
    await Command.execute('Panel.handleClickClose')

    // Assert
    await expect(panel).toBeHidden()
  }
}

export const createInvalidSelectionTest = (view: PanelName): Test => {
  return async ({ Command, expect, Locator, Panel }: TestContext) => {
    // Arrange
    await Panel.open(view)
    const tab = getTab(Locator, view)
    await expect(tab).toHaveAttribute('aria-selected', 'true')

    // Act
    await Command.execute('Panel.selectName', 'not-found')

    // Assert
    await expect(tab).toHaveAttribute('aria-selected', 'true')
  }
}

export const createReselectTest = (view: PanelName): Test => {
  return async ({ Command, expect, Locator, Panel }: TestContext) => {
    // Arrange
    await Panel.open(view)
    const tab = getTab(Locator, view)
    await expect(tab).toHaveAttribute('aria-selected', 'true')

    // Act
    await Command.execute('Panel.selectName', view)

    // Assert
    await expect(tab).toHaveAttribute('aria-selected', 'true')
  }
}

export const createSelectIndexTest = (from: PanelName, index: number, to: PanelName): Test => {
  return async ({ Command, expect, Locator, Panel }: TestContext) => {
    // Arrange
    await Panel.open(from)
    const fromTab = getTab(Locator, from)
    const toTab = getTab(Locator, to)
    await expect(fromTab).toHaveAttribute('aria-selected', 'true')

    // Act
    await Command.execute('Panel.selectIndex', index)

    // Assert
    await expect(fromTab).toHaveAttribute('aria-selected', 'false')
    await expect(toTab).toHaveAttribute('aria-selected', 'true')
  }
}

export const createSelectIndexRawTest = (from: PanelName, rawIndex: string, to: PanelName): Test => {
  return async ({ Command, expect, Locator, Panel }: TestContext) => {
    // Arrange
    await Panel.open(from)
    const fromTab = getTab(Locator, from)
    const toTab = getTab(Locator, to)
    await expect(fromTab).toHaveAttribute('aria-selected', 'true')

    // Act
    await Command.execute('Panel.selectIndexRaw', rawIndex)

    // Assert
    await expect(fromTab).toHaveAttribute('aria-selected', 'false')
    await expect(toTab).toHaveAttribute('aria-selected', 'true')
  }
}

export const createToggleViewTest = (from: PanelName, to: PanelName): Test => {
  return async ({ Command, expect, Locator, Panel }: TestContext) => {
    // Arrange
    await Panel.open(from)
    const fromTab = getTab(Locator, from)
    const toTab = getTab(Locator, to)
    await expect(fromTab).toHaveAttribute('aria-selected', 'true')

    // Act
    await Command.execute('Panel.toggleView', to)

    // Assert
    await expect(fromTab).toHaveAttribute('aria-selected', 'false')
    await expect(toTab).toHaveAttribute('aria-selected', 'true')
  }
}
