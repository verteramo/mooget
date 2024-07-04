import { Test, defaultTest } from '@/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: Test = defaultTest

const currentSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    setCurrent: (_state, action: PayloadAction<Test>) => {
      console.log('setCurrent', action.payload)
      return action.payload
    },

    clearCurrent: () => {
      return defaultTest
    }
  }
})

export const { setCurrent } = currentSlice.actions

export default currentSlice.reducer
