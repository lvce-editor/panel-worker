import { expect, test } from '@jest/globals'
import * as GetContentDimensions from '../src/parts/GetContentDimensions/GetContentDimensions.ts'

test('getContentDimensions should derive bounds from header height in state', () => {
  const result = GetContentDimensions.getContentDimensions({
    actionsUid: 0,
    assetDir: '',
    badgeCounts: {},
    childUid: 0,
    currentViewletId: '',
    errorCount: 0,
    headerHeight: 35,
    height: 200,
    initial: false,
    platform: 0,
    selectedIndex: -1,
    tabs: [],
    uid: 1,
    views: [],
    warningCount: 0,
    width: 300,
    x: 10,
    y: 20,
  })

  expect(result).toEqual({
    height: 165,
    width: 300,
    x: 10,
    y: 55,
  })
})
