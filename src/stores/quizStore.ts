/*******************************************************************************
 * quizStore.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { snapshot } from 'valtio'

// Project dependencies
import { Quiz } from '@/models'
import { persistedStore } from '@/utils/store'

/***************************************
 * Types and interface
 ***************************************/

/**
 * Sortable field
 */
export type SortableField = 'name' | 'category' | 'questions'

/**
 * Sort order
 */
export type SortOrder = 'asc' | 'desc'

/**
 * Quiz store interface
 */
export interface QuizStore {
  /**
   * List of quizzes
   */
  list: Quiz[]

  /**
   * Sort state
   */
  sortState?: {
    /**
     * Field to sort by
     */
    field: SortableField

    /**
     * Sort order
     */
    order: SortOrder
  }
}

/***************************************
 * Store
 ***************************************/

/**
 * Store instance
 */
const store = persistedStore<QuizStore>('local:quizzes', {
  list: []
})

export default store

/***************************************
 * Actions
 ***************************************/

/**
 * Add a quiz to the store
 * @param quiz The quiz to add
 */
export const addQuiz = (quiz: Quiz): void => {
  store.list.push(quiz)
}

/**
 * Edit a quiz in the store
 * @param editState The edit state
 */
export const updateQuiz = (id: string, category: string, name: string): void => {
  const index = store.list.findIndex(({ id: currentId }) => currentId === id)
  store.list[index] = {
    ...store.list[index],
    category,
    name
  }
}

/**
 * Remove a quiz from the store
 * @param id The id of the quiz to remove
 */
export const removeQuiz = (id: string): void => {
  const index = store.list.findIndex((quiz) => quiz.id === id)
  store.list.splice(index, 1)
}

/**
 * Toggle the favorite status of a quiz in the store
 * @param id The id of the quiz to update
 */
export const toggleFavorite = (id: string): void => {
  const index = store.list.findIndex((quiz) => quiz.id === id)
  store.list[index].favorite = !(store.list[index].favorite ?? false)
}

/**
 * Toggle the sequential status of a quiz in the store
 * @param id The id of the quiz to update
 */
export const toggleSequential = (id: string): void => {
  const index = store.list.findIndex((quiz) => quiz.id === id)
  store.list[index].sequential = !(store.list[index].sequential ?? false)
}

/**
 * Set the sort state
 * @param field The field to sort by
 */
export const toggleSort = (field: SortableField): void => {
  const { sortState } = snapshot(store)

  store.sortState =
    (sortState?.field === field)
      ? sortState.order === 'asc'
        ? { field, order: 'desc' }
        : undefined
      : { field, order: 'asc' }
}

/***************************************
 * Utils
 ***************************************/

/**
 * Get the question ids
 * @returns The question ids
 */
const getQuestionIds = (): string[] => {
  return (
    snapshot(store).list
      .flatMap(({ questions }) => questions)
      .flatMap(({ id }) => id)
  )
}

/**
 * Filter quiz questions
 * @param quiz The quiz to filter
 * @returns The filtered quiz
 */
export const filterQuiz = (quiz: Quiz): Quiz => {
  const ids = getQuestionIds()

  return {
    ...quiz,
    questions: quiz.questions.filter(
      ({ id }) => !ids.includes(id)
    )
  }
}

/**
 * Download a quiz
 * @param quiz The quiz to download
 */
export const downloadQuiz = (id: string): void => {
  const quiz = snapshot(store).list.find(({ id: currentId }) => currentId === id)

  if (quiz) {
    const element = document.createElement('a')
    element.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(quiz, null, 2))}`
    element.download = `${quiz.name}.json`
    element.click()
    document.removeChild(element)
  }
}
