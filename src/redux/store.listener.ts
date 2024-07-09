/**
 * Storage listener
 * Updates the store when the storage changes
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import {
  configInitialState,
  IStore,
  store,
  testsInitialState
} from '@/redux'
import { createAction } from '@reduxjs/toolkit'

export const updateFromStorage = createAction<IStore>('updateFromStorage')

/***************************************
 * Configuration slice initial state
 **************************************/

const storeInitialState: IStore = {
  tests: testsInitialState,
  config: configInitialState
}

/***************************************
 * Listener
 **************************************/

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    const root: string | undefined =
      changes['persist:root']?.newValue

    let newState: IStore

    if (root === undefined) {
      newState = storeInitialState
    } else {
      const data: {
        tests: string
        config: string
      } = JSON.parse(root)

      newState = {
        tests: JSON.parse(data.tests),
        config: JSON.parse(data.config)
      }
    }

    store.dispatch(updateFromStorage(newState))
  }
})
