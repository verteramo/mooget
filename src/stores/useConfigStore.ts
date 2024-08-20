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
import { webextStorage } from './storages/webextStorage'

// Project dependencies
import { Config } from '@/models'
import { Palette } from '@/utilities/colors'

interface ConfigState extends Config {
  toggleMode: () => void
  setColor: (color: Palette) => void
  setLanguage: (language: string) => void
  toggleVisibility: () => void
  toggleClipboard: () => void
}

export const useConfigStore = create<ConfigState>()(
  subscribeWithSelector(persist((set) => ({
    mode: 'light',
    color: Palette.Turtle,
    language: 'en',
    visibility: false,
    clipboard: false,

    toggleMode: () => set(({ mode }) => ({ mode: mode === 'light' ? 'dark' : 'light' })),

    setColor: (color: Palette) => set(() => ({ color })),

    setLanguage: (language: string) => set(() => ({ language })),

    toggleVisibility: () => set(({ visibility }) => ({ visibility: !visibility })),

    toggleClipboard: () => set(({ clipboard }) => ({ clipboard: !clipboard }))
  }), {
    name: 'config',
    storage: webextStorage('sync')
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
