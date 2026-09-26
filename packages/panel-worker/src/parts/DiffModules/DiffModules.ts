import * as DiffActionsUid from '../DiffActionsUid/DiffActionsUid.ts'
import * as DiffItems from '../DiffItems/DiffItems.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const modules = [DiffItems.isEqual, DiffActionsUid.isEqual]

export const numbers = [DiffType.RenderIncremental, DiffType.RenderActionsUid]
