/*******************************************************************************
 * progressStore.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { snapshot } from 'valtio'

// Package dependencies
import quizStore from './quizStore'

// Project dependencies
import { UserAnswer } from '@/models'
import { persistedStore } from '@/utils/store'

/***************************************
 * Interface
 ***************************************/

/**
 * User progress interface
 */
export interface ProgressStore {

  /**
   * Current tab
   */
  tab: string

  /**
   * Current step
   */
  step: number

  /**
   * Quiz ID
   */
  quizId?: string

  /**
   * Answers
   */
  answers: UserAnswer[]
}

/***************************************
 * Store
 ***************************************/

const store = persistedStore<ProgressStore>('local:progress', {
  tab: 'stepper',
  step: 0,
  answers: []
})

export default store

/***************************************
 * Actions
 ***************************************/

/**
 * Set the current tab
 * @param tab The tab to set
 */
export const setTab = (tab: string): void => {
  store.tab = tab
}

/**
 * Decrease the step
 */
export const back = (): void => {
  store.step--
}

/**
 * Increase the step
 */
export const next = (): void => {
  store.step++
}

/**
 * Set the quiz to play ID
 */
export const startProgress = (id: string): void => {
  store.quizId = id
  store.step = 0

  const quiz = snapshot(quizStore).list.find(({ id: currentId }) => currentId === id)
  store.answers = quiz?.questions.map(({ type, answers }, index) => ({
    type,
    index,
    value: answers.map(() => undefined)
  })) ?? []
}

export const cancelProgress = (): void => {
  store.quizId = undefined
  store.step = 0
  store.answers = []
}

export const setAnswer = (index: number, value: any): void => {
  store.answers[index].value = value
}

/***************************************
 * Utils
 ***************************************/

// export const getQuiz = (): Quiz | undefined => {
//   const { list } = quizStore
//   const { quiz } = snapshot(store)

//   return list.find(({ id }) => id === quiz)
// }
