/*******************************************************************************
 * store.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import {
  combineReducers,
  configureStore,
  createAction,
  createListenerMiddleware
} from '@reduxjs/toolkit'

import {
  persistReducer,
  persistStore
} from 'redux-persist'

import {
  localStorage
} from 'redux-persist-webextension-storage'

import i18n from 'i18next'

/** Package dependencies */
import { sliceConfig, sliceConfigInitialState } from './sliceConfig'
import { sliceProgress, sliceProgressInitialState } from './sliceProgress'
import { sliceQuizzes, sliceQuizzesInitialState } from './sliceQuizzes'

/** Project dependencies */
import { Store } from '@/core/models/Store'

/***************************************
 * Middleware configuration
 **************************************/

export const storageAction = createAction<Store>('storageAction')

const storageListenerMiddleware = createListenerMiddleware<Store>()
storageListenerMiddleware.startListening({
  actionCreator: storageAction,
  effect: async ({ payload: { config: { language } } }) => {
    try {
      if (i18n.isInitialized && language !== i18n.language) {
        await i18n.changeLanguage(language)
      }
    } catch (error) {
      console.log('store.ts > i18n.changeLanguage', error)
    }
  }
})

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    const root: string | undefined =
      changes[`persist:${PERSIST_KEY}`]?.newValue

    const newState: Store = {
      config: sliceConfigInitialState,
      quizzes: sliceQuizzesInitialState,
      progress: sliceProgressInitialState
    }

    if (root !== undefined) {
      for (const [key, value] of Object.entries<string>(JSON.parse(root))) {
        newState[key as keyof Store] = JSON.parse(value)
      }
    }

    store.dispatch(storageAction(newState))
  }
})

/***************************************
 * Persist configuration
 **************************************/

const PERSIST_KEY = 'root'

const persistedReducer = persistReducer({
  key: PERSIST_KEY,
  storage: localStorage
}, combineReducers({
  config: sliceConfig.reducer,
  quizzes: sliceQuizzes.reducer,
  progress: sliceProgress.reducer
}))

/***************************************
 * Store & persistor
 **************************************/

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
    }
  }).concat(storageListenerMiddleware.middleware)
})

export const persistor = persistStore(store)
