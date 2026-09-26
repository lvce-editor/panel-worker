import * as I18nString from '@lvce-editor/i18n'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const maximize = (): string => {
  return I18nString.i18nString(UiStrings.Maximize)
}

export const unmaximize = (): string => {
  return I18nString.i18nString(UiStrings.Unmaximize)
}

export const close = (): string => {
  return I18nString.i18nString(UiStrings.Close)
}
