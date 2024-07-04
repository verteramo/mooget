import { Test } from '@/models'
import { IStore } from '@/redux'
import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit'

const initialState: Test[] = []

export const updateFromStorage = createAction<IStore>('updateFromStorage')

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    createTest: (state, action: PayloadAction<Test>) => {
      if (!state.some(test => test.id === action.payload.id)) {
        return [...state, action.payload]
      }
    },

    deleteTest: (state, action: PayloadAction<string>) => {
      return state.filter(test => test.id !== action.payload)
    },

    updateTest: (state, action: PayloadAction<Test>) => {
      return state.map(test => test.id === action.payload.id ? action.payload : test)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateFromStorage, (state, action) => {
      return action.payload.tests
    })
  }
})

export const { createTest, deleteTest, updateTest } = testsSlice.actions

export default testsSlice.reducer
