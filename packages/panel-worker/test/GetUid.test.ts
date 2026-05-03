import { expect, jest, test } from '@jest/globals'
import * as GetUid from '../src/parts/GetUid/GetUid.ts'

test('getUid should delegate to Math.random', () => {
  const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5)

  const result = GetUid.getUid()

  expect(result).toBe(0.5)

  randomSpy.mockRestore()
})
