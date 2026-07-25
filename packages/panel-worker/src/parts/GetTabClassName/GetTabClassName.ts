import { mergeClassNames } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

const selectedClass = mergeClassNames(ClassNames.PanelTab, ClassNames.PanelTabSelected)

export const getTabClassName = (isSelected: boolean): string => {
  if (isSelected) {
    return selectedClass
  }
  return ClassNames.PanelTab
}
