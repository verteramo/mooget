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
import { Colors } from '@/utils/colors'
import { PaletteMode } from '@mui/material'

export const sliceConfigInitialState: Config = {
  mode: 'light',
  primaryColor: Colors.Blue,
  language: 'es',
  revealAnswers: false,
  clipboardEnabled: false
}

export const sliceConfig = createSlice({
  name: 'config',
  initialState: sliceConfigInitialState,
  reducers: {
    sliceConfigSetMode: (state, { payload: mode }: PayloadAction<PaletteMode>) => {
      return { ...state, mode }
    },

    sliceConfigSetPrimary: (state, { payload: primaryColor }: PayloadAction<string>) => {
      return { ...state, primaryColor }
    },

    sliceConfigSetLanguage: (state, { payload: language }: PayloadAction<string>) => {
      return { ...state, language }
    },

    sliceConfigSetRevealAnswers: (state, { payload: revealAnswers }: PayloadAction<boolean>) => {
      return { ...state, revealAnswers }
    },

    sliceConfigSetClipboardEnabled: (state, { payload: clipboardEnabled }: PayloadAction<boolean>) => {
      return { ...state, clipboardEnabled }
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
  sliceConfigSetLanguage,
  sliceConfigSetRevealAnswers,
  sliceConfigSetClipboardEnabled
} = sliceConfig.actions
