import { RendererWorker } from '@lvce-editor/rpc-registry'

export const createViewlet = async (
  viewletModuleId: string,
  editorUid: number,
  tabId: number,
  actionsUid: number,
  bounds: any,
  uri: string,
): Promise<void> => {
  await RendererWorker.invoke('Layout.createPanelViewlet', viewletModuleId, editorUid, tabId, actionsUid, bounds, uri)
}
