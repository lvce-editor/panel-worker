import { terminate } from '@lvce-editor/viewlet-registry'
import * as Panel from '../Create/Create.ts'
import { diff2 } from '../Diff2/Diff2.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import { getCommandIds, wrapCommand, wrapGetter } from '../PanelStates/PanelStates.ts'
import { render2 } from '../Render2/Render2.ts'
import { renderEventListeners } from '../RenderEventListeners/RenderEventListeners.ts'
import { resize } from '../Resize/Resize.ts'
import { saveState } from '../SaveState/SaveState.ts'

export const commandMap = {
  'Panel.create': Panel.create,
  'Panel.diff2': diff2,
  'Panel.getCommandIds': getCommandIds,
  'Panel.handleBlur': wrapCommand(LoadContent.handleBlur),
  'Panel.handleClickClose': wrapCommand(LoadContent.handleClickClose),
  'Panel.handleClickMaximize': wrapCommand(LoadContent.handleClickMaximize),
  'Panel.handleFilterInput': wrapCommand(LoadContent.handleFilterInput),
  'Panel.loadContent': wrapCommand(LoadContent.loadContent),
  'Panel.openViewlet': wrapCommand(LoadContent.openViewlet),
  'Panel.render2': render2,
  'Panel.renderEventListeners': renderEventListeners,
  'Panel.resize': wrapCommand(resize),
  'Panel.saveState': wrapGetter(saveState),
  'Panel.selectIndex': wrapCommand(LoadContent.selectIndex),
  'Panel.selectIndexRaw': wrapCommand(LoadContent.selectRaw),
  'Panel.setBadgeCount': wrapCommand(LoadContent.setBadgeCount),
  'Panel.terminate': terminate,
  'Panel.toggleView': wrapCommand(LoadContent.toggleView),
}
