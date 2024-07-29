/*******************************************************************************
 * sliceProgress.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/** Project dependencies */
import { IProgress } from '@/core/models/IProgress'
import { IQuiz } from '@/core/models/IQuiz'

export const sliceProgressInitialState: IProgress = {
  step: 0
}

export const sliceProgress = createSlice({
  name: 'progress',
  initialState: sliceProgressInitialState,
  reducers: {
    sliceProgressSetQuiz: (state, { payload: quiz }: PayloadAction<IQuiz>) => {
      console.log('setQuiz:', quiz)
      return { ...state, quiz }
    },
    sliceProgressSetStep: (state, { payload: step }: PayloadAction<number>) => {
      return { ...state, step }
    }
  }
})

export const {
  sliceProgressSetQuiz,
  sliceProgressSetStep
} = sliceProgress.actions
