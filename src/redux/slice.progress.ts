/**
 * Redux slice for configuration
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/**
 * Initial state for configuration
 */
export const progressInitialState = {
  currentTest: ''
}

/**
 * Configuration slice
 */
export const progressSlice = createSlice({
  name: 'progress',
  initialState: progressInitialState,
  reducers: {
    setCurrentTest: (state, { payload: currentTest }: PayloadAction<string>) => {
      return { ...state, currentTest }
    }
  }
})

export const {
  setCurrentTest
} = progressSlice.actions

export default progressSlice.reducer
