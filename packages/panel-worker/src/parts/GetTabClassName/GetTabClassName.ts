import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getTabClassName = (isSelected: boolean): string => {
  let className = ClassNames.PanelTab
  if (isSelected) {
    className += ' ' + ClassNames.PanelTabSelected
  }
  return className
}
