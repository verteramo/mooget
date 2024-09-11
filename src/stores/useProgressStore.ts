/*******************************************************************************
 * useProgressStore.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'

// Package dependencies
import { getQuiz } from './useQuizStore'
import { wxtStorage } from './wxtStorage'

// Project dependencies
import { UserAnswer } from '@/models'

/***************************************
 * Interface
 ***************************************/

/**
 * User progress interface
 */
export interface ProgressStore {

  /**
   * Quiz ID
   */
  quizId?: string

  /**
   * Current tab
   */
  tab: string

  /**
   * Current answer step
   */
  step: number

  /**
   * Reveal answers
   */
  revealAnswers: boolean

  /**
   * Answers
   */
  userAnswers: UserAnswer[]
}

const initialState: ProgressStore = {
  quizId: undefined,
  tab: 'stepper',
  step: 0,
  revealAnswers: false,
  userAnswers: []
}

/***************************************
 * Store
 ***************************************/

export const useProgressStore = create<ProgressStore>()(
  subscribeWithSelector(persist(() => initialState, {
    name: 'progress-store',
    storage: wxtStorage('local')
  }))
)

/***************************************
 * Actions
 ***************************************/

/**
 * Set the current tab
 * @param tab The tab to set
 */
export const setTab = (tab: string): void => {
  useProgressStore.setState((state) => ({
    ...state,
    tab
  }))
}

/**
 * Decrease the step
 */
export const back = (): void => {
  useProgressStore.setState((state) => ({
    ...state,
    step: state.step - 1
  }))
}

/**
 * Increase the step
 */
export const next = (): void => {
  useProgressStore.setState((state) => ({
    ...state,
    step: state.step + 1
  }))
}

/**
 * Set the quiz to play ID
 */
export const startProgress = (id: string): void => {
  useProgressStore.setState((state) => ({
    ...state,
    quizId: id,
    step: 0,
    userAnswers: shuffle(getQuiz(id)?.questions.map(({ type, answers: questionAnswers }, index) => ({
      index,
      value: (
        type === 'truefalse'
          ? [false, false]
          : type === 'matching'
            ? Array(questionAnswers.length).fill('')
            : (type === 'text' || type === 'essay')
                ? ['']
                : Array(questionAnswers.length).fill(false)
      )
    })) ?? [])
  }))
}

export const resetProgress = (): void => {
  useProgressStore.setState(initialState)
}

export const setAnswer = (index: number, value: any): void => {
  useProgressStore.setState((state) => ({
    ...state,
    userAnswers: state.userAnswers.map((answer, i) => i === index ? { ...answer, value } : answer)
  }))
}

export function toggleRevealAnswers (): void {
  useProgressStore.setState((state) => ({
    ...state,
    revealAnswers: !state.revealAnswers
  }))
}

/***************************************
 * Rehydration
 ***************************************/

storage.watch<ProgressStore>('local:progress-store', (store) => {
  if (store !== null) {
    useProgressStore.persist.rehydrate()?.catch(console.error)
  }
})
