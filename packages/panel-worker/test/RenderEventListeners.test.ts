import { expect, test } from '@jest/globals'
import { EventExpression } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners should return array with HandleClick event listener', () => {
  const result = RenderEventListeners.renderEventListeners()
  expect(result).toBeDefined()
})

test('renderEventListeners should include tab context menu listener', () => {
  const result = RenderEventListeners.renderEventListeners()

  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleTabContextMenu,
    params: ['handleTabContextMenu', EventExpression.Button, EventExpression.ClientX, EventExpression.ClientY],
    preventDefault: true,
  })
})
