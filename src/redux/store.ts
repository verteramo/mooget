import { Environment } from '@/models'
import { configureStore } from '@reduxjs/toolkit'
import { environmentSlice } from './slices'

export interface AppStore {
  environment: Environment
}

export default configureStore<AppStore>({
  reducer: {
    environment: environmentSlice.reducer
  }
})
