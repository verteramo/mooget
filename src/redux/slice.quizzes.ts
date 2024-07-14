/**
 * Redux slice for quizzes
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { IQuiz } from '@/dom'
import { updateFromStorage } from '@/redux'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/***************************************
 * Tests slice initial state
 **************************************/

export const quizzesInitialState: IQuiz[] = []

/***************************************
 * Tests slice definition
 **************************************/

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: quizzesInitialState,
  reducers: {
    createQuiz: (state, { payload: quiz }: PayloadAction<IQuiz>) => {
      if (state.some(current => current.id === quiz.id)) {
        return state.map(current => current.id === quiz.id
          ? {
              ...current,
              questions: [
                ...current.questions,
                ...quiz.questions
              ]
            }
          : current
        )
      }

      return [...state, quiz]
    },

    removeQuiz: (state, { payload: id }: PayloadAction<string>) => {
      return state.filter(current => current.id !== id)
    },

    updateQuiz: (state, { payload: quiz }: PayloadAction<IQuiz>) => {
      return state.map(current => current.id === quiz.id ? quiz : current)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateFromStorage, (_state, { payload: { quizzes } }) => {
      return quizzes
    })
  }
})

/***************************************
 * Exports
 **************************************/

export const {
  createQuiz,
  removeQuiz,
  updateQuiz
} = quizzesSlice.actions

export default quizzesSlice.reducer
