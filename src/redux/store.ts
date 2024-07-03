import { Test } from '@/models'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { testsSlice } from './test.slice'
import { persistReducer, persistStore } from 'redux-persist'
import { localStorage } from 'redux-persist-webextension-storage'

export interface IStore {
  tests: Test[]
}

const persistConfig = {
  key: 'root',
  storage: localStorage
}

const rootReducer = combineReducers({
  tests: testsSlice.reducer
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
