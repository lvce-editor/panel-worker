import { cp, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.ts'

const sharedProcessPath = join(root, 'node_modules', '@lvce-editor', 'shared-process', 'index.js')

const sharedProcessUrl = pathToFileURL(sharedProcessPath).toString()

const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/panel-worker'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
  testPath: 'packages/e2e',
})

const rendererWorkerPath = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

export const getRemoteUrl = (path: string): string => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const content = await readFile(rendererWorkerPath, 'utf8')
const workerPath = join(root, '.tmp/dist/dist/panelWorkerMain.js')
const remoteUrl = getRemoteUrl(workerPath)

const occurrence = `// const panelWorkerUrl = \`\${assetDir}/packages/panel-worker/dist/panelWorkerMain.js\`
const panelWorkerUrl = \`${remoteUrl}\``
const replacement = `const panelWorkerUrl = \`\${assetDir}/packages/panel-worker/dist/panelWorkerMain.js\``
const runtimePanelWorkerUrl =
  /panelWorkerUrl = getRuntimeWorkerUrl\(\s*"develop\.panelWorkerPath",\s*`\$\{assetDir\}\/packages\/renderer-worker\/node_modules\/@lvce-editor\/panel-worker\/dist\/panelWorkerMain\.js`\s*\)/
const newContent = content.includes(occurrence)
  ? content.replace(occurrence, replacement)
  : content.replace(runtimePanelWorkerUrl, `panelWorkerUrl = \`${remoteUrl}\``)

if (newContent === content) {
  throw new Error('occurrence not found')
}
await writeFile(rendererWorkerPath, newContent)

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
