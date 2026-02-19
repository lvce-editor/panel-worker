import * as DomEventListenersFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderEventListeners = (): readonly any[] => {
  return [
    {
      name: DomEventListenersFunctions.HandleClickMaximize,
      params: ['handleClickMaximize'],
    },
    {
      name: DomEventListenersFunctions.HandleClickClose,
      params: ['handleClickClose'],
    },
    {
      name: DomEventListenersFunctions.HandleClickSelectTab,
      params: ['selectIndexRaw', 'event.target.dataset.index'],
    },
  ]
}
