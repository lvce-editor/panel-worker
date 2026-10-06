import type { Test } from '@lvce-editor/test-with-playwright'

export type TestContext = Readonly<Parameters<Test>[0]>
