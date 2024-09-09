/*******************************************************************************
 * useConfigStore.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'

// Package dependencies
import { wxtStorage } from './wxtStorage'

/***************************************
 * Interface
 ***************************************/

/**
 * Config store interface
 */
export interface ConfigStore {

  /**
   * Current theme
   */
  mode: 'light' | 'dark'

  /**
   * Current language
   */
  language: string
}

/***************************************
 * Store
 ***************************************/

/**
 * Config store instance
 */
export const useConfigStore = create<ConfigStore>()(
  subscribeWithSelector(persist((_set) => ({
    mode: 'light',
    language: 'en'
  }), {
    name: 'config-store',
    storage: wxtStorage('sync')
  }))
)

/***************************************
 * Actions
 ***************************************/

/**
 * Toggle the mode between light and dark
 */
export const toggleMode = (): void => {
  useConfigStore.setState((state) => ({
    ...state,
    mode: state.mode === 'light' ? 'dark' : 'light'
  }))
}

/**
 * Set the language
 * @param language The language to set
 */
export const setLanguage = (language: string): void => {
  useConfigStore.setState((state) => ({
    ...state,
    language
  }))
}

/***************************************
 * Rehydration
 ***************************************/

storage.watch<ConfigStore>('sync:config-store', (store) => {
  if (store !== null) {
    useConfigStore.persist.rehydrate()?.catch(console.error)
  }
})
