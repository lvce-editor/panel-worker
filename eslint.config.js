import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config.default,
  ...config.recommendedVirtualDom,
  ...config.recommendedActions,
  ...config.recommendedTsconfig,
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
])
