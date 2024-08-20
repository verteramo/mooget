/*******************************************************************************
 * webextStorage.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { StorageArea } from 'wxt/storage'
import { createJSONStorage, StateStorage } from 'zustand/middleware'

const webextApi = (area: StorageArea): StateStorage => ({
  getItem: async function (name: string): Promise<string> {
    return JSON.stringify(await storage.getItem(`${area}:${name}`))
  },

  setItem: async function (name: string, value: string): Promise<void> {
    await storage.setItem(`${area}:${name}`, JSON.parse(value))
  },

  removeItem: async function (name: string): Promise<void> {
    await storage.removeItem(`${area}:${name}`)
  }
})

const webextStorage =
  (area: StorageArea): ReturnType<typeof createJSONStorage> =>
    createJSONStorage(() => webextApi(area))

export { webextStorage }
