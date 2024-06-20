/**
 * useStorageList
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { useEffect, useState } from 'react'

export function useStorageList<T> ({
  variable,
  area
}: {
  variable: string
  area: chrome.storage.StorageArea
}): [
    T[],
    (
      element: T,
      comparison: (current: T) => boolean,
      merge: (current: T) => T
    ) => void,
    (index: number, element: T) => void,
    (index: number) => void
  ] {
  /** List state */
  const [list, setList] = useState<T[]>([])

  /**
   * Insert element
   * @param element Element
   * @param comparison Function to compare
   * @param merge Function to merge
   */
  const insert = (
    element: T,
    comparison: (current: T) => boolean,
    merge: (current: T) => T
  ): void => {
    area.get([variable], (data) => {
      const currentList = data[variable] as T[]
      for (let index = 0; index < currentList.length; index++) {
        // If element exists, merge it
        if (comparison(currentList[index])) {
          update(index, merge(currentList[index]))
          return
        }
      }

      // Otherwise, insert it
      area.set({ [variable]: [...currentList, element] }).catch(console.error)
    })
  }

  /**
   * Update element
   * @param index Element index
   * @param element New element
   */
  const update = (index: number, element: T): void => {
    area.get([variable], (data) => {
      const currentList = data[variable] as T[]
      currentList[index] = element
      area.set({ [variable]: currentList }).catch(console.error)
    })
  }

  /**
   * Remove element
   * @param index Element index
   */
  const remove = (index: number): void => {
    area.get([variable], (data) => {
      const currentList = data[variable] as T[]
      currentList.splice(index, 1)
      area.set({ [variable]: currentList }).catch(console.error)
    })
  }

  useEffect(() => {
    // Listen for changes
    chrome.storage.onChanged.addListener((changes) => {
      if (changes[variable] != null) {
        setList(changes[variable].newValue)
      }
    })

    // Get list from storage
    area.get([variable], (result) => setList(result[variable]))
  }, [])

  // Expose hooks
  return [list, insert, update, remove]
}
