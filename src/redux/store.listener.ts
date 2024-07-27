/**
 * Updates the store when the storage changes
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import {
  IStore,
  store,
  storeInitialState
} from '@/redux'
import { createAction } from '@reduxjs/toolkit'

export const storageAction = createAction<IStore>('storageAction')

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    const root: string | undefined =
      changes['persist:root']?.newValue

    const newState: { [key: string]: any } = storeInitialState

    if (root !== undefined) {
      for (const [key, value] of Object.entries<string>(JSON.parse(root))) {
        newState[key] = JSON.parse(value)
      }
    }

    store.dispatch(storageAction(newState as IStore))
  }
})
