import { RendererWorker } from '@lvce-editor/rpc-registry'

export const createViewlet = async (
  viewletModuleId: string,
  editorUid: number,
  tabId: number,
  actionsUid: number,
  bounds: any,
  uri: string,
  focus: boolean,
  applicationId?: string,
): Promise<void> => {
  if (applicationId === undefined) {
    await RendererWorker.invoke('Layout.createPanelViewlet', viewletModuleId, editorUid, tabId, actionsUid, bounds, uri, focus)
  } else {
    await RendererWorker.invoke(
      'Application.execute',
      applicationId,
      'Layout.createPanelViewlet',
      viewletModuleId,
      editorUid,
      tabId,
      actionsUid,
      bounds,
      uri,
      focus,
    )
  }
}
