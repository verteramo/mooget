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
  quizzesInitialState
} from '@/redux'
import { createAction } from '@reduxjs/toolkit'

export const updateFromStorage = createAction<IStore>('updateFromStorage')

/***************************************
 * Configuration slice initial state
 **************************************/

const storeInitialState: IStore = {
  config: configInitialState,
  quizzes: quizzesInitialState
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
        config: string
        quizzes: string
      } = JSON.parse(root)

      newState = {
        config: JSON.parse(data.config),
        quizzes: JSON.parse(data.quizzes)
      }
    }

    store.dispatch(updateFromStorage(newState))
  }
})
