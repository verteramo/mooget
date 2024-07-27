/**
 * Redux slice for configuration
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { storageAction } from '@/redux'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type Theme = 'light' | 'dark'

export interface IConfig {
  theme: Theme
  language: string
}

export const configInitialState: IConfig = {
  theme: 'light',
  language: 'es'
}

export const configSlice = createSlice({
  name: 'config',
  initialState: configInitialState,
  reducers: {
    setTheme: (state, { payload: theme }: PayloadAction<Theme>) => {
      return { ...state, theme }
    },

    setLanguage: (state, { payload: language }: PayloadAction<string>) => {
      return { ...state, language }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(storageAction, (_state, { payload: { config } }) => {
      return config
    })
  }
})

export const {
  setTheme,
  setLanguage
} = configSlice.actions
