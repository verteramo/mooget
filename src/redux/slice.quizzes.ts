/**
 * Redux slice for quizzes
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { IQuiz } from '@/dom'
import { storageAction } from '@/redux'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const quizzesInitialState: IQuiz[] = []

export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: [] as IQuiz[],
  reducers: {
    createQuiz: (state, { payload: quiz }: PayloadAction<IQuiz>) => {
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

    removeQuiz: (state, { payload: id }: PayloadAction<string>) => {
      return state.filter(({ id: currentId }) => currentId !== id)
    },

    updateQuiz: (state, { payload: quiz }: PayloadAction<IQuiz>) => {
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
  createQuiz,
  removeQuiz,
  updateQuiz
} = quizzesSlice.actions
