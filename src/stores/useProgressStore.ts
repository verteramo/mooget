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
import { Progress, UserAnswer } from '../models'
import { webextStorage } from './storages/webextStorage'

interface ProgressState extends Progress {
  setQuiz: (quiz: string) => void
  setStep: (step: number) => void
  setAnswer: (answer: UserAnswer) => void
  setProgress: (progress: Progress) => void
}

export const useProgressStore = create<ProgressState>()(
  persist((set) => ({
    step: 0,
    answers: [],

    setQuiz: (quizId) => set(() => ({ quizId })),

    setStep: (step) => set(() => ({ step })),

    setAnswer: (answer) => set(({ answers, step }) => ({
      answers: answers.map(
        (item, index) => index === step ? answer : item
      )
    })),

    setProgress: (progress: Progress) => {
      console.log('progress', progress)
      set(() => (progress))
    }
  }), {
    name: 'progress',
    storage: webextStorage('local')
  })
)
