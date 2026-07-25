import { execa } from 'execa'
import { root } from './root.ts'

const main = async (): Promise<void> => {
  execa(
    'npm',
    [
      'exec',
      '--',
      'esbuild',
      '--format=esm',
      '--bundle',
      '--external:node:buffer',
      '--external:electron',
      '--external:ws',
      '--external:node:worker_threads',
      '--watch',
      'packages/panel-worker/src/panelWorkerMain.ts',
      '--outfile=.tmp/dist/dist/panelWorkerMain.js',
    ],
    {
      cwd: root,
      stdio: 'inherit',
    },
  )
}

main()
