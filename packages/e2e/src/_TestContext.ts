import type { Test } from '@lvce-editor/test-worker'

export type TestContext = Readonly<Parameters<Test>[0]>
