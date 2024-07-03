import { Test } from '@/models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// import { updateFromStorage } from './action'

const initialState: Test[] = []

export const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    createTest: (state, action: PayloadAction<Test>) => {
      if (!state.some(test => test.id === action.payload.id)) {
        return [...state, action.payload]
      }
    },

    removeTest: (state, action: PayloadAction<Test>) => {
      return state.filter(test => test.id !== action.payload.id)
    },

    updateTest: (state, action: PayloadAction<Test>) => {
      return state.map(test => test.id === action.payload.id ? action.payload : test)
    }
  }
  // extraReducers: (builder) => {
  //   builder.addCase(updateFromStorage, (state, action) => {
  //     if (Array.isArray(action.payload.tests)) {
  //       return action.payload.tests
  //     }
  //     return state
  //   })
  // }
})

export const { createTest, removeTest, updateTest } = testsSlice.actions
