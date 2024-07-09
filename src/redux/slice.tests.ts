/**
 * Redux slice for tests
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { ITest } from '@/dom'
import { updateFromStorage } from '@/redux'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/***************************************
 * Tests slice initial state
 **************************************/

export const testsInitialState: ITest[] = []

/***************************************
 * Tests slice definition
 **************************************/

const testsSlice = createSlice({
  name: 'tests',
  initialState: testsInitialState,
  reducers: {
    createTest: (state, { payload: test }: PayloadAction<ITest>) => {
      if (!state.some(current => current.id === test.id)) {
        return [...state, test]
      }

      return state
    },

    deleteTest: (state, { payload: id }: PayloadAction<string>) => {
      return state.filter(current => current.id !== id)
    },

    updateTest: (state, { payload: test }: PayloadAction<ITest>) => {
      return state.map(current => current.id === test.id ? test : current)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateFromStorage, (_state, { payload: { tests } }) => {
      return tests
    })
  }
})

/***************************************
 * Exports
 **************************************/

export const {
  createTest,
  deleteTest,
  updateTest
} = testsSlice.actions

export default testsSlice.reducer
