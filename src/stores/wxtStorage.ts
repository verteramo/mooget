/*******************************************************************************
 * wxtStorage.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { StorageArea } from 'wxt/storage'
import { createJSONStorage, StateStorage } from 'zustand/middleware'

const wxtStorageApi = (area: StorageArea): StateStorage => ({
  getItem: async (name: string): Promise<string> => {
    return JSON.stringify(await storage.getItem(`${area}:${name}`))
  },

  setItem: async (name: string, value: string): Promise<void> => {
    // It is saved parsed to see it in
    // storage as an object and not as a string
    await storage.setItem(`${area}:${name}`, JSON.parse(value))
  },

  removeItem: async (name: string): Promise<void> => {
    await storage.removeItem(`${area}:${name}`)
  }
})

const wxtStorage =
  (area: StorageArea): ReturnType<typeof createJSONStorage> =>
    createJSONStorage(() => wxtStorageApi(area))

export { wxtStorage }
