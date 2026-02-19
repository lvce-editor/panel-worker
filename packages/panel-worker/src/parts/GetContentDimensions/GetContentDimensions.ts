import type { PanelDimensions } from '../PanelDimensions/PanelDimensions.ts'
import type { PanelState } from '../PanelState/PanelState.ts'

export const getContentDimensions = (dimensions: PanelState): PanelDimensions => {
  return {
    height: dimensions.height - 35,
    width: dimensions.width,
    x: dimensions.x,
    y: dimensions.y + 35,
  }
}
