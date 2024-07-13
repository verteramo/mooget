/**
 * Redux store configuration
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { IQuiz } from '@/dom'
import configReducer, { IConfig } from '@/redux/slice.config'
import progressReducer from '@/redux/slice.progress'
import quizzesReducer from '@/redux/slice.quizzes'
import i18n from 'i18next'

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
  config: IConfig
  quizzes: IQuiz[]
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
  config: configReducer,
  quizzes: quizzesReducer,
  progress: progressReducer
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
    i18n.changeLanguage(action.payload.config.language).catch((error) => {
      console.log('i18n error', error)
    })
  }
})

// Serializability configuration
const serializableConfig = {
  serializableCheck: {
    ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', '']
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
