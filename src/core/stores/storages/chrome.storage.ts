// External dependencies
import { createJSONStorage, StateStorage } from 'zustand/middleware'

const chromeApi = (area: chrome.storage.StorageArea): StateStorage => ({
  getItem: async function (name: string): Promise<string> {
    const data = await area.get(name)
    return JSON.stringify(data[name])
  },

  setItem: async function (name: string, value: string): Promise<void> {
    await area.set({ [name]: JSON.parse(value) })
  },

  removeItem: async function (name: string): Promise<void> {
    await area.remove(name)
  }
})

const chromeStorage = (
  area: chrome.storage.StorageArea = chrome.storage.local
): ReturnType<typeof createJSONStorage> => createJSONStorage(() => chromeApi(area))

export { chromeStorage }
