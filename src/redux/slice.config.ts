/**
 * Redux slice for configuration
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { updateFromStorage } from '@/redux'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/**
 * Theme type
 */
export type Theme = 'light' | 'dark'

/**
 * Configuration interface
 */
export interface IConfig {
  theme: Theme
  language: string
  currentTest: string
}

/**
 * Initial state for configuration
 */
export const configInitialState: IConfig = {
  theme: 'light',
  language: 'es',
  currentTest: ''
}

/**
 * Configuration slice
 */
export const configSlice = createSlice({
  name: 'config',
  initialState: configInitialState,
  reducers: {
    setConfigTheme: (state, { payload: theme }: PayloadAction<Theme>) => {
      return { ...state, theme }
    },

    setConfigLanguage: (state, { payload: language }: PayloadAction<string>) => {
      return { ...state, language }
    },

    setConfigCurrentTest: (state, { payload: currentTest }: PayloadAction<string>) => {
      return { ...state, currentTest }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateFromStorage, (_state, { payload: { config } }) => {
      return config
    })
  }
})

export const {
  setConfigTheme,
  setConfigLanguage,
  setConfigCurrentTest
} = configSlice.actions

export default configSlice.reducer
