/**
 * Redux store
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

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

import i18n from 'i18next'

import { QuizInfo } from '@/dom'

import {
  configInitialState,
  configSlice,
  IConfig,
  IProgress,
  progressInitialState,
  progressSlice,
  quizzesInitialState,
  quizzesSlice,
  storageAction
} from '@/redux'

/***************************************
 * Store model
 **************************************/

export interface IStore {
  config: IConfig
  quizzes: QuizInfo[]
  progress: IProgress
}

export const storeInitialState: IStore = {
  config: configInitialState,
  quizzes: quizzesInitialState,
  progress: progressInitialState
}

/***************************************
 * Persist configuration
 **************************************/

const persistConfig = {
  key: 'root',
  storage: localStorage
}

const rootReducer = combineReducers({
  config: configSlice.reducer,
  quizzes: quizzesSlice.reducer,
  progress: progressSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

/***************************************
 * Middleware configuration
 **************************************/

const storageListenerMiddleware = createListenerMiddleware<IStore>()
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

const serializableConfig = {
  serializableCheck: {
    ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
  }
}

/***************************************
 * Store & persistor
 **************************************/

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    serializableConfig
  ).concat(storageListenerMiddleware.middleware)
})

export const persistor = persistStore(store)
