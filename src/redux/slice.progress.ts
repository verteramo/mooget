/**
 * Redux slice for user progress
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { IQuiz } from '@/dom'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IProgress {
  quiz?: IQuiz
  step?: number
}

export const progressInitialState: IProgress = {}

export const progressSlice = createSlice({
  name: 'progress',
  initialState: progressInitialState,
  reducers: {
    setQuiz: (state, { payload: quiz }: PayloadAction<IQuiz>) => {
      return { ...state, quiz }
    },
    setStep: (state, { payload: step }: PayloadAction<number>) => {
      return { ...state, step }
    }
  }
})

export const {
  setQuiz,
  setStep
} = progressSlice.actions
