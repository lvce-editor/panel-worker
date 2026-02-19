import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { PanelState } from '../PanelState/PanelState.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getActionsDom } from '../GetActionsDom/GetActionsDom.ts'
import { getGlobalActionsDom } from '../GetGlobalActionsDom/GetGlobalActionsDom.ts'
import { getPanelTabsVirtualDom } from '../GetPanelTabsVirtualDom/GetPanelTabsVirtualDom.ts'

export const getPanelHeaderDom = (newState: PanelState): readonly VirtualDomNode[] => {
  const tabsDom = getPanelTabsVirtualDom(newState.views, newState.selectedIndex, newState.badgeCounts)
  return [
    {
      childCount: 3,
      className: ClassNames.PanelHeader,
      type: VirtualDomElements.Div,
    },
    {
      childCount: newState.views.length,
      className: ClassNames.PanelTabs,
      role: AriaRoles.TabList,
      type: VirtualDomElements.Div,
    },
    ...tabsDom,
    ...getActionsDom(newState),
    ...getGlobalActionsDom(),
  ]
}
