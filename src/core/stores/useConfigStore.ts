// External dependencies
import i18n from 'i18next'
import { create, StateCreator } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'

// Package dependencies
import { Config } from '../models'
import { Color } from '../utilities/colors'
import { chromeStorage } from './storages/chrome.storage'

interface ConfigState extends Config {
  toggleMode: () => void
  setColor: (color: Color) => void
  setLanguage: (language: string) => void
  toggleVisibility: () => void
  toggleClipboard: () => void
}

const configState: StateCreator<ConfigState> = (set) => ({
  mode: 'light',
  color: Color.Turtle,
  language: 'en',
  visibility: false,
  clipboard: false,

  toggleMode: () => set(({ mode }) => ({ mode: mode === 'light' ? 'dark' : 'light' })),

  setColor: (color: Color) => set(() => ({ color })),

  setLanguage: (language: string) => set(() => ({ language })),

  toggleVisibility: () => set(({ visibility }) => ({ visibility: !visibility })),

  toggleClipboard: () => set(({ clipboard }) => ({ clipboard: !clipboard }))
})

export const useConfigStore = create<ConfigState>()(
  subscribeWithSelector(persist(configState, {
    name: 'config',
    storage: chromeStorage(chrome.storage.sync)
  }))
)

useConfigStore.subscribe(({ language }) => language, (language) => {
  if (i18n.isInitialized) {
    i18n.changeLanguage(language).catch(console.error)
  }
}, { fireImmediately: true })

chrome.storage.onChanged.addListener((changes) => {
  if (changes.config !== undefined) {
    useConfigStore.persist.rehydrate()?.catch(console.error)
  }
})
