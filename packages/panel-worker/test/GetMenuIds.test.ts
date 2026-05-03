import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { getMenuIds } from '../src/parts/GetMenuIds/GetMenuIds.ts'

test('getMenuIds returns array with Tab', () => {
  const result = getMenuIds()

  expect(result).toEqual([MenuEntryId.Tab])
})
