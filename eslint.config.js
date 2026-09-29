import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'
import * as tsconfig from '@lvce-editor/eslint-plugin-tsconfig'

export default defineConfig([
  ...config.default,
  ...config.recommendedVirtualDom,
  ...config.recommendedActions,
  ...tsconfig.default,
  {
    files: ['packages/{e2e,e2e-integration}/**/*.ts'],
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
  {
    // The pinned application supplies its own Node runtime.
    files: ['.github/workflows/integration.yml'],
    rules: { 'github-actions/node-version-file': 'off', 'github-actions/on': 'off' },
  },
  {
    // Preserve real DOM input events covered by the migrated application scenarios.
    files: ['packages/e2e-integration/src/viewlet.panel-tab-context-menu.ts'],
    rules: { '@typescript-eslint/no-deprecated': 'off' },
  },
])
