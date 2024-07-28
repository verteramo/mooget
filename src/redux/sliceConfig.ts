/**
 * sliceConfig.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IConfig } from '@/core/models/IConfig'

import { storageAction } from '@/redux/store'

export const sliceConfigInitialState: IConfig = {
  theme: 'light',
  language: 'es'
}

export const sliceConfig = createSlice({
  name: 'config',
  initialState: sliceConfigInitialState,
  reducers: {
    sliceConfigSetTheme: (state, { payload: theme }: PayloadAction<IConfig['theme']>) => {
      return { ...state, theme }
    },

    sliceConfigSetLanguage: (state, { payload: language }: PayloadAction<string>) => {
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
  sliceConfigSetTheme,
  sliceConfigSetLanguage
} = sliceConfig.actions
