/*******************************************************************************
 * sliceConfig.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/** Package dependencies */
import { storageAction } from './store'

/** Project dependencies */
import { Config } from '@/core/models/Config'
import { PaletteMode } from '@mui/material'

export const Colors = [
  '#4caf50',
  '#03a9f4',
  '#ba68c8',
  '#ef5350',
  '#ff9800'
]

export const sliceConfigInitialState: Config = {
  mode: 'light',
  primary: Colors[0],
  language: 'es'
}

export const sliceConfig = createSlice({
  name: 'config',
  initialState: sliceConfigInitialState,
  reducers: {
    sliceConfigSetMode: (state, { payload: mode }: PayloadAction<PaletteMode>) => {
      return { ...state, mode }
    },

    sliceConfigSetPrimary: (state, { payload: primary }: PayloadAction<string>) => {
      return { ...state, primary }
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
  sliceConfigSetMode,
  sliceConfigSetPrimary,
  sliceConfigSetLanguage
} = sliceConfig.actions
