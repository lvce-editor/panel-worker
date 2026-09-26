import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getCurrentViewletId } from '../src/parts/GetCurrentViewletId/GetCurrentViewletId.ts'

test('returns the active panel view without side effects', () => {
  const state = {
    ...createDefaultState(),
    currentViewletId: 'Terminals',
  }

  expect(getCurrentViewletId(state)).toBe('Terminals')
})
