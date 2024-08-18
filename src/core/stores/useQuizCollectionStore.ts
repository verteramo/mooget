// External dependencies
import { create, StateCreator } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'

// Package dependencies
import { Quiz } from '../models'
import { chromeStorage } from './storages/chrome.storage'

interface QuizCollectionState {
  items: Quiz[]
  addQuiz: (quiz: Quiz) => void
  removeQuiz: (id: string) => void
  updateQuiz: (quiz: Quiz) => void
  toggleFavorite: (id: string) => void
}

const quizCollectionState: StateCreator<QuizCollectionState> = (set) => ({
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
})

export const useQuizCollectionStore = create<QuizCollectionState>()(
  subscribeWithSelector(persist(quizCollectionState, {
    name: 'quizCollection',
    storage: chromeStorage()
  }))
)

chrome.storage.onChanged.addListener((changes) => {
  if (changes.quizCollection !== undefined) {
    useQuizCollectionStore.persist.rehydrate()?.catch(console.error)
  }
})
