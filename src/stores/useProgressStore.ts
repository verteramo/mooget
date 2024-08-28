/*******************************************************************************
 * useProgressStore.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Package dependencies
import { wxtStorage } from './wxtStorage'

// Project dependencies
import { Progress, Quiz, UserAnswer } from '@/models'
import { shuffle } from '@/utils/native'

interface ProgressState extends Progress {
  setQuiz: (quiz: string) => void
  addStep: (steps: number) => void
  setStep: (step: number) => void
  setAnswer: (answer: UserAnswer) => void
  initProgress: (quiz: Quiz) => void
}

export const useProgressStore = create<ProgressState>()(
  persist((set) => ({
    step: 0,
    answers: [],

    setQuiz: (quizId) => set(() => ({ quizId })),

    addStep: (steps) => set(({ step }) => ({ step: step + steps })),

    setStep: (step) => set(() => ({ step })),

    setAnswer: (answer) => set(({ answers, step }) => ({
      answers: answers.map(
        (item, index) => index === step ? answer : item
      )
    })),

    initProgress: (quiz) => {
      const questions = quiz.questions.filter(({ type }) => type !== 'description')
      const descriptions = quiz.questions.filter(({ type }) => type === 'description')

      const answers = questions.map((question, index) => ({
        index,
        type: question.type,
        value: question.answers?.map(() => undefined) ?? []
      }))

      set(() => ({
        quizId: quiz.id,
        step: 0,
        answers: [...descriptions.map((description, index) => ({
          index,
          type: description.type
        })), ...(
          quiz.sequential === true
            ? answers
            : shuffle(answers)
        )]
      }))
    }
  }), {
    name: 'progress',
    storage: wxtStorage('local')
  })
)
