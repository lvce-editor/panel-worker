import { expect, test } from '@jest/globals'
import { getPanelTabsVirtualDom } from '../src/parts/GetPanelTabsVirtualDom/GetPanelTabsVirtualDom.ts'
import { createPanelView } from '../test-utils/PanelViewTestHelpers.ts'

test('getPanelTabsVirtualDom renders the view name and keeps its ID for tab actions', () => {
  const view = createPanelView('publisher.extension-view', 'Extension View', 'extension')
  const dom = getPanelTabsVirtualDom([view], 0, { 'publisher.extension-view': 4 })

  expect(dom[0]).toMatchObject({ ariaSelected: true, name: 'publisher.extension-view' })
  expect(dom[1]).toMatchObject({ text: 'Extension View' })
  expect(dom[3]).toMatchObject({ text: ' 4' })
})
