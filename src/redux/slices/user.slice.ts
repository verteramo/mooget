import { Environment, EnvironmentDefault as EnvironmentInitialState } from '@/models'
import { Slice, createSlice } from '@reduxjs/toolkit'

export const environmentSlice: Slice<Environment> = createSlice({
  name: 'environment',
  initialState: EnvironmentInitialState,
  reducers: {
    setEnvironment: (state, action) => ({ ...state, ...action.payload }),
    resetEnvironment: () => EnvironmentInitialState
  }
})

export const { setEnvironment, resetEnvironment } = environmentSlice.actions

export default environmentSlice.reducer
