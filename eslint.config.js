import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'
import * as tsconfig from '@lvce-editor/eslint-plugin-tsconfig'

export default [
  ...config.default,
  ...config.recommendedVirtualDom,
  ...actions.default,
  ...tsconfig.default,
  {
    files: ['packages/e2e/**/*.ts'],
    rules: {
      'e2e/no-imports': 'off',
    },
  },
  {
    files: ['packages/panel-worker/test/**/*.ts'],
    rules: {
      'virtual-dom/prefer-constants': 'off',
      'virtual-dom/prefer-merge-class-names': 'off',
    },
  },
]
