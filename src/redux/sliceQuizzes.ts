/*******************************************************************************
 * sliceQuizzes.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/** Package dependencies */
import { storageAction } from './store'

/** Project dependencies */
import { IQuiz } from '@/core/models/IQuiz'

export const sliceQuizzesInitialState: IQuiz[] = []

export const sliceQuizzes = createSlice({
  name: 'quizzes',
  initialState: sliceQuizzesInitialState,
  reducers: {
    sliceQuizzesCreateQuiz: (state, { payload: quiz }: PayloadAction<IQuiz>) => {
      if (state.some(({ id }) => id === quiz.id)) {
        return state.map(current => current.id === quiz.id
          ? {
              ...current,
              questions: [...current.questions, ...quiz.questions]
            }
          : current
        )
      }

      return [...state, quiz]
    },

    sliceQuizzesRemoveQuiz: (state, { payload: id }: PayloadAction<string>) => {
      return state.filter(({ id: currentId }) => currentId !== id)
    },

    sliceQuizzesUpdateQuiz: (state, { payload: quiz }: PayloadAction<IQuiz>) => {
      return state.map((current) => current.id === quiz.id ? quiz : current)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(storageAction, (_state, { payload: { quizzes } }) => {
      return quizzes
    })
  }
})

export const {
  sliceQuizzesCreateQuiz,
  sliceQuizzesRemoveQuiz,
  sliceQuizzesUpdateQuiz
} = sliceQuizzes.actions
