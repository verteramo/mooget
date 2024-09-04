/*******************************************************************************
 * configStore.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

import { persistedStore } from '@/utils/store'

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
 * Store instance
 */
const store = persistedStore<ConfigStore>('sync:config', {
  mode: 'light',
  language: 'en'
})

export default store

/***************************************
 * Actions
 ***************************************/

/**
 * Toggle the mode between light and dark
 */
export const toggleMode = (): void => {
  store.mode = store.mode === 'light' ? 'dark' : 'light'
}

/**
 * Set the language
 * @param language The language to set
 */
export const setLanguage = (language: string): void => {
  store.language = language
}

/***************************************
 * Utils
 ***************************************/
