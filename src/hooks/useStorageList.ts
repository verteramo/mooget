/**
 * useStorageList
 * 
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import { useEffect, useState } from "react";

/**
 * StorageHookProps interface
 * 
 * @property variable Storage variable
 * @property area Storage area
 */
interface StorageHookProps {
  variable: string;
  area: chrome.storage.StorageArea;
}

/**
 * Hook to manage a list in storage
 * @param variable Storage variable
 * @param area Storage area
 * @returns Hook functions
 */
export function useStorageList<T>({ variable, area }: StorageHookProps): [
  T[],
  (element: T, comparison: (current: T) => boolean, merge: (current: T) => T) => void,
  (index: number, element: T) => void,
  (index: number) => void
] {
  /** List state */
  const [list, setList] = useState<T[]>([])

  /**
   * Inserts element
   * @param element Element
   * @param comparison Function to compare
   * @param merge Function to merge
   */
  const insert = (
    element: T,
    comparison: (current: T) => boolean,
    merge: (current: T) => T
  ) => {
    area.get([variable], data => {
      const currentList: T[] = data[variable] || []
      for (let index = 0; index < currentList.length; index++) {
        // If element exists, merge it
        if (comparison(currentList[index])) {
          update(index, merge(currentList[index]))
          return
        }
      }

      // Otherwise, insert it
      area.set({ [variable]: [...currentList, element] })
    })
  }

  /**
   * Updates element
   * @param index Element index
   * @param element New element
   */
  const update = (index: number, element: T) => {
    area.get([variable], data => {
      const currentList: T[] = data[variable] || []
      currentList[index] = element
      area.set({ [variable]: currentList })
    })
  }

  /**
   * Removes element
   * @param index Element index
   */
  const remove = (index: number) => {
    area.get([variable], data => {
      const currentList: T[] = data[variable] || []
      currentList.splice(index, 1)
      area.set({ [variable]: currentList })
    })
  }

  useEffect(() => {
    // Listens for changes
    chrome.storage.onChanged.addListener((changes) => {
      if (changes[variable]) {
        setList(changes[variable].newValue)
      }
    })

    // Gets list from storage
    area.get([variable], result => setList(result[variable]))
  }, [])

  // Exposes hooks
  return [list, insert, update, remove]
}
