/**
 * Redux store configuration
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { ITest } from '@/dom'
import i18n from 'i18next'
import configReducer, { IConfig } from '@/redux/slice.config'
import testsReducer from '@/redux/slice.tests'

import {
  combineReducers,
  configureStore,
  createListenerMiddleware
} from '@reduxjs/toolkit'

import {
  persistReducer,
  persistStore
} from 'redux-persist'

import {
  localStorage
} from 'redux-persist-webextension-storage'

import { updateFromStorage } from './store.listener'

/***************************************
 * Store interface
 **************************************/

export interface IStore {
  tests: ITest[]
  config: IConfig
}

/***************************************
 * Reducer configuration
 **************************************/

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: localStorage
}

// Root reducer
const rootReducer = combineReducers({
  tests: testsReducer,
  config: configReducer
})

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

/***************************************
 * Middleware configuration
 **************************************/

// Listener middleware
const configListenerMiddleware = createListenerMiddleware<IStore>()
configListenerMiddleware.startListening({
  actionCreator: updateFromStorage,
  effect: async (action) => {
    i18n.changeLanguage(action.payload.config.language).catch(console.error)
  }
})

// Serializability configuration
const serializableConfig = {
  serializableCheck: {
    ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
  }
}

/***************************************
 * Store
 **************************************/

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    serializableConfig
  ).prepend(configListenerMiddleware.middleware)
})

/***************************************
 * Persistor
 **************************************/

export const persistor = persistStore(store)
