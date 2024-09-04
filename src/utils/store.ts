import { proxy, snapshot, subscribe } from 'valtio'
import { StorageItemKey } from 'wxt/storage'

/**
 * Create a store that persists its state in storage
 * @param key The key to use for storage
 * @param initialState The initial state of the store
 * @returns The store instance
 */
export function persistedStore<T extends object> (key: StorageItemKey, initialState?: T): T {
  /**
   * Store instance
   */
  const store = proxy(initialState)

  /**
   * Hydrate the store with the given value
   * @param value The value to hydrate the store with
   */
  const hydrate = (value: T | null): void => {
    if (value !== null) {
      Object.assign(store, value)
    }
  }

  // Watch for changes in storage
  storage.watch<T>(key, hydrate)

  // Load initial state from storage
  storage.getItem<T>(key).then(hydrate).catch(console.error)

  // Save changes on state change
  subscribe(store, () => {
    storage.setItem(key, snapshot(store)).catch(console.error)
  })

  return store
}
