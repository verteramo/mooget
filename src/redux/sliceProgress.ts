/*******************************************************************************
 * sliceProgress.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/** Package dependencies */
import { storageAction } from './store'

/** Project dependencies */
import { Progress } from '@/core/models/Progress'
import { UserAnswer } from '@/core/models/UserAnswer'

export const sliceProgressInitialState: Progress = {
  step: 0,
  answers: []
}

export const sliceProgress = createSlice({
  name: 'progress',
  initialState: sliceProgressInitialState,
  reducers: {
    sliceProgressSetQuiz: (state, { payload: quiz }: PayloadAction<string>) => {
      return { ...state, quiz }
    },
    sliceProgressSetStep: (state, { payload: step }: PayloadAction<number>) => {
      return { ...state, step }
    },
    sliceProgressSetAnswers: (state, { payload: answers }: PayloadAction<UserAnswer[]>) => {
      return { ...state, answers }
    },
    sliceProgressSetProgress: (state, { payload: progress }: PayloadAction<Progress>) => {
      return { ...state, ...progress }
    },
    sliceProgressSetAnswer: (state, { payload: answer }: PayloadAction<UserAnswer>) => {
      return {
        ...state,
        answers: state.answers.map(
          (item, index) => index === state.step ? answer : item
        )
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(storageAction, (_state, { payload: { progress } }) => {
      return progress
    })
  }
})

export const {
  sliceProgressSetQuiz,
  sliceProgressSetStep,
  sliceProgressSetAnswers,
  sliceProgressSetProgress,
  sliceProgressSetAnswer
} = sliceProgress.actions
