/**
 * useStorageList
 * 
 * @link https://github.com/verteramo
 * @license GNU GPLv3
 */

import { useEffect, useState } from "react";

interface StorageHookProps {
  variable: string;
  area: chrome.storage.StorageArea;
}

export function useStorageList<T>({ variable, area }: StorageHookProps): [
  T[],
  (element: T, comparison: (current: T) => boolean, merge: (current: T) => T) => void,
  (index: number, element: T) => void,
  (index: number) => void
] {
  const [list, setList] = useState<T[]>([])

  const insert = (
    element: T,
    comparison: (current: T) => boolean,
    merge: (current: T) => T
  ) => {
    area.get([variable], data => {
      const currentList: T[] = data[variable] || []
      for (let index = 0; index < currentList.length; index++) {
        if (comparison(currentList[index])) {
          update(index, merge(currentList[index]))
          return
        }
      }
      area.set({ [variable]: [...currentList, element] })
    })
  }

  const update = (index: number, element: T) => {
    area.get([variable], data => {
      const currentList: T[] = data[variable] || []
      currentList[index] = element
      area.set({ [variable]: currentList })
    })
  }

  const remove = (index: number) => {
    area.get([variable], data => {
      const currentList: T[] = data[variable] || []
      currentList.splice(index, 1)
      area.set({ [variable]: currentList })
    })
  }

  useEffect(() => {
    chrome.storage.onChanged.addListener((changes) => {
      if (changes[variable]) {
        setList(changes[variable].newValue)
      }
    })

    area.get([variable], result => setList(result[variable]))
  }, [])

  return [
    list,
    insert,
    update,
    remove,
  ]
}
