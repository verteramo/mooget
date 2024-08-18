// External dependencies
import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

// Package dependencies
import { Progress, UserAnswer } from '../models'
import { chromeStorage } from './storages/chrome.storage'

interface ProgressState extends Progress {
  setQuiz: (quiz: string) => void
  setStep: (step: number) => void
  setAnswer: (answer: UserAnswer) => void
  setProgress: (progress: Progress) => void
}

const progressState: StateCreator<ProgressState> = (set) => ({
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
})

export const useProgressStore = create<ProgressState>()(
  persist(progressState, {
    name: 'progress',
    storage: chromeStorage()
  })
)
