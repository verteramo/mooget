/*******************************************************************************
 * useQuizCollectionStore.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'

// Package dependencies
import { Quiz } from '../models'
import { webextStorage } from './storages/webextStorage'

interface QuizCollectionState {
  items: Quiz[]
  addQuiz: (quiz: Quiz) => void
  removeQuiz: (id: string) => void
  updateQuiz: (quiz: Quiz) => void
  toggleFavorite: (id: string) => void
}

export const useQuizCollectionStore = create<QuizCollectionState>()(
  subscribeWithSelector(persist((set) => ({
    items: [],

    addQuiz: (quiz: Quiz) => set(({ items }) => ({
      items: [...items, quiz]
    })),

    removeQuiz: (id: string) => set(({ items }) => ({
      items: items.filter((item) => item.id !== id)
    })),

    updateQuiz: (quiz: Quiz) => set(({ items }) => ({
      items: items.map((item) => item.id === quiz.id ? quiz : item)
    })),

    toggleFavorite: (id: string) => set(({ items }) => ({
      items: items.map(
        (item) => item.id === id
          ? { ...item, favorite: !(item.favorite ?? false) }
          : item
      )
    }))
  }), {
    name: 'quizCollection',
    storage: webextStorage('local')
  }))
)

storage.watch<Quiz[]>('local:quizCollection', (collection) => {
  if (collection !== null) {
    useQuizCollectionStore.persist.rehydrate()?.catch(console.error)
  }
})
