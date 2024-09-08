/*******************************************************************************
 * wxtStorage.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { StorageArea } from 'wxt/storage'
import { createJSONStorage, StateStorage } from 'zustand/middleware'

const wxtStateStorage = (area: StorageArea): StateStorage => ({
  getItem: async function (name) {
    return JSON.stringify(await storage.getItem(`${area}:${name}`))
  },

  setItem: async function (name, value) {
    await storage.setItem(`${area}:${name}`, JSON.parse(value))
  },

  removeItem: async function (name) {
    await storage.removeItem(`${area}:${name}`)
  }
})

export const wxtStorage =
  (area: StorageArea): ReturnType<typeof createJSONStorage> =>
    createJSONStorage(() => wxtStateStorage(area))
