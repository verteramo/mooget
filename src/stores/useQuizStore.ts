/*******************************************************************************
 * useQuizStore.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'

// Package dependencies
import { wxtStorage } from './wxtStorage'

// Project dependencies
import { Quiz, UserAnswer, Solution } from '@/models'

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
export const useQuizStore = create<QuizStore>()(
  subscribeWithSelector(persist((_set) => ({
    list: []
  }), {
    name: 'quiz-store',
    storage: wxtStorage('local')
  }))
)

/***************************************
 * Actions
 ***************************************/

/**
 * Add a quiz to the store
 * @param quiz The quiz to add
 */
export const addQuiz = (quiz: Quiz): void => {
  useQuizStore.setState((state) => ({
    ...state,
    list: [...state.list, quiz]
  }))
}

/**
 * Edit a quiz in the store
 * @param editState The edit state
 */
export const updateQuiz = (id: string, category: string, name: string): void => {
  useQuizStore.setState((state) => ({
    ...state,
    list: state.list.map((quiz) => {
      if (quiz.id === id) {
        return { ...quiz, category, name }
      }

      return quiz
    })
  }))
}

/**
 * Remove a quiz from the store
 * @param id The id of the quiz to remove
 */
export const removeQuiz = (id: string): void => {
  useQuizStore.setState((state) => ({
    ...state,
    list: state.list.filter((quiz) => quiz.id !== id)
  }))
}

/**
 * Toggle the favorite status of a quiz in the store
 * @param id The id of the quiz to update
 */
export const toggleFavorite = (id: string): void => {
  useQuizStore.setState((state) => ({
    ...state,
    list: state.list.map((quiz) => quiz.id === id ? { ...quiz, favorite: !(quiz.favorite ?? false) } : quiz)
  }))
}

/**
 * Toggle the sequential status of a quiz in the store
 * @param id The id of the quiz to update
 */
export const toggleSequential = (id: string): void => {
  useQuizStore.setState((state) => ({
    ...state,
    list: state.list.map((quiz) => {
      if (quiz.id === id) {
        return { ...quiz, sequential: !(quiz.sequential ?? false) }
      }

      return quiz
    })
  }))
}

/**
 * Set the sort state
 * @param field The field to sort by
 */
export const toggleSort = (field: SortableField): void => {
  useQuizStore.setState((state) => {
    const { sortState } = state

    return {
      ...state,
      sortState: (
        sortState?.field === field
          ? sortState.order === 'asc'
            ? { field, order: 'desc' }
            : undefined
          : { field, order: 'asc' }
      )
    }
  })
}

/***************************************
 * Rehydration
 ***************************************/

storage.watch<QuizStore>('local:quiz-store', (store) => {
  if (store !== null) {
    useQuizStore.persist.rehydrate()?.catch(console.error)
  }
})

/***************************************
 * Utils
 ***************************************/

/**
 * Get a quiz by id
 * @param id The id of the quiz to getç
 */
export const getQuiz = (id: string): Quiz | undefined => {
  return useQuizStore.getState().list.find(({ id: currentId }) => currentId === id)
}

/**
 * Get the question ids
 */
const getQuestionIds = (): string[] => {
  return (
    useQuizStore.getState().list
      .flatMap(({ questions }) => questions)
      .flatMap(({ id }) => id)
  )
}

/**
 * Filter quiz questions
 * @param quiz The quiz to filter
 * @param list The list of quizzes
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

const getCorrectAnswers = (quiz: Quiz): Array<Array<string | boolean> | undefined> => {
  return quiz.questions.map(({ type, answers }) => {
    switch (type) {
      case 'multichoice':
        return answers.map(({ match }) => match as boolean)

      case 'matching':
        return answers.map(({ match }) => match as string)

      case 'text':
        return answers.map(({ value }) => value as string)

      case 'truefalse':{
        const [answer] = answers.map(({ value }) => value as boolean)
        return [answer, !answer]
      }
    }

    return undefined
  })
}

export const getSolutions = (quiz: Quiz, userAnswers: UserAnswer[]): Solution[] => {
  const correctAnswers = getCorrectAnswers(quiz)

  return userAnswers.map(({ index, value }) => ({
    index,
    userAnswer: value,
    questionAnswer: correctAnswers[index]
  }))
}

/**
 * Download a quiz
 * @param quiz The quiz to download
 */
export const downloadQuiz = (id: string): void => {
  const quiz = useQuizStore.getState().list.find(({ id: currentId }) => currentId === id)

  if (quiz !== undefined) {
    const element = document.createElement('a')
    element.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(quiz, null, 2))}`
    element.download = `${quiz.name}.json`
    element.click()
    document.removeChild(element)
  }
}

export const uploadQuiz = async (file: File): Promise<Quiz> => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const result = e.target?.result as string
        const quiz: Quiz = JSON.parse(result)
        resolve(quiz)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = reject

    reader.readAsText(file)
  })
}
