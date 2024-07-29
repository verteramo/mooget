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
import { IConfig } from '@/core/models/IConfig'

export const Colors = [
  '#66bb6a',
  '#29b6f6',
  '#ce93d8',
  '#f44336',
  '#ffa726'
]

export const sliceConfigInitialState: IConfig = {
  mode: 'light',
  primary: Colors[0],
  language: 'es'
}

export const sliceConfig = createSlice({
  name: 'config',
  initialState: sliceConfigInitialState,
  reducers: {
    sliceConfigSetMode: (state, { payload: mode }: PayloadAction<IConfig['mode']>) => {
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
