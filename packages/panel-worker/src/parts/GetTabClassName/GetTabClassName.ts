import { mergeClassNames } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getTabClassName = (isSelected: boolean): string => {
  let className = ClassNames.PanelTab
  if (isSelected) {
    className = mergeClassNames(className, ClassNames.PanelTabSelected)
  }
  return className
}
