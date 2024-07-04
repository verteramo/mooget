import { Test } from '@/models'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { localStorage } from 'redux-persist-webextension-storage'
import testsReducer from './test.slice'
import currentReducer from './current.slice'

export interface IStore {
  tests: Test[]
  current: Test
}

export const StoreInitialState = {
  tests: []
}

const persistConfig = {
  key: 'root',
  storage: localStorage
}

const rootReducer = combineReducers({
  tests: testsReducer,
  current: currentReducer
})

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
    }
  })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
