/*******************************************************************************
 * useConfigStore.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import i18n from 'i18next'
import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'

// Package dependencies
import { wxtStorage } from './wxtStorage'

// Project dependencies
import { Config } from '@/models'
import { Color, getPreferredMode } from '@/utils/colors'

interface ConfigState extends Config {
  toggleMode: () => void
  setColor: (color: Color) => void
  setLanguage: (language: string) => void
  toggleClipboard: () => void
  toggleVisibility: () => void
  setPrintQuizId: (quizId: string) => void
}

const initialMode = getPreferredMode()

export const useConfigStore = create<ConfigState>()(
  subscribeWithSelector(persist((set) => ({
    mode: initialMode,
    color: 'turtle',
    language: 'en',
    clipboard: false,
    visibility: false,
    printQuizId: '',

    toggleMode: () => set(({ mode }) => ({ mode: mode === 'light' ? 'dark' : 'light' })),

    setColor: (color) => set(() => ({ color })),

    setLanguage: (language) => set(() => ({ language })),

    toggleClipboard: () => set(({ clipboard }) => ({ clipboard: !clipboard })),

    toggleVisibility: () => set(({ visibility }) => ({ visibility: !visibility })),

    setPrintQuizId: (printQuizId) => set(() => ({ printQuizId }))
  }), {
    name: 'config',
    storage: wxtStorage('sync')
  }))
)

storage.watch<Config>('sync:config', (config) => {
  if (config !== null) {
    useConfigStore.persist.rehydrate()?.catch(console.error)
  }
})

useConfigStore.subscribe(({ language }) => language, (language) => {
  if (i18n.isInitialized) {
    i18n.changeLanguage(language).catch(console.error)
  }
}, { fireImmediately: true })
