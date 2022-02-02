import * as remote from '@electron/remote'
import { getAppPathProxy } from '../main-process-proxy'
import { getPath } from '../main-process-proxy'

let app: Electron.App | null = null
let path: string | null = null
let documentsPath: string | null = null

export type PathType =
  | 'home'
  | 'appData'
  | 'userData'
  | 'cache'
  | 'temp'
  | 'exe'
  | 'module'
  | 'desktop'
  | 'documents'
  | 'downloads'
  | 'music'
  | 'pictures'
  | 'videos'
  | 'recent'
  | 'logs'
  | 'crashDumps'

function getApp(): Electron.App {
  if (!app) {
    app = remote.app
  }

  return app
}

/**
 * Get the version of the app.
 *
 * This is preferable to using `remote` directly because we cache the result.
 */
export function getVersion(): string {
  return __APP_VERSION__
}

/**
 * Get the name of the app.
 */
export function getName(): string {
  return __APP_NAME__
}

/**
 * Get the path to the application.
 *
 * This is preferable to using `remote` directly because we cache the result.
 */
export async function getAppPath(): Promise<string> {
  if (!path) {
    path = await getAppPathProxy()
  }

  return path
}

/**
 * Get the path to the user's documents path.
 *
 * This is preferable to using `remote` directly because we cache the result.
 */
export async function getDocumentsPath(): Promise<string> {
  if (!documentsPath) {
    try {
      documentsPath = await getPath('documents')
    } catch (ex) {
      // a user profile may not have the Documents folder defined on Windows
      documentsPath = await getPath('home')
    }
  }

  return documentsPath
}
