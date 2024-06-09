/**
 * useTheme
 * 
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import { useEffect, useState } from 'react';

/** Theme type */
type Theme = 'light' | 'dark'

/**
 * Hook to manage the theme of the extension
 * @returns [isDark, toggleTheme]
 */
export function useTheme(): [() => boolean, () => void] {

  /** Storage variable */
  const StorageVariable = 'theme'

  /** Theme state */
  const [theme, setTheme] = useState<Theme>('light')

  /**
   * Verifies if the theme is dark
   * @returns true if the theme is dark, false otherwise
   */
  const isDark = () => theme === 'dark'

  /**
   * Toggles the theme
   */
  const toggleTheme = () => {
    chrome.storage.sync.set({
      theme: isDark() ? 'light' : 'dark'
    })
  }

  useEffect(() => {
    // Sets the theme in the DOM when it changes
    document.documentElement.setAttribute('data-bs-theme', theme)
  }, [theme])

  useEffect(() => {
    // Listens for changes in the storage variable
    chrome.storage.onChanged.addListener((changes) => {
      if (changes[StorageVariable]) {
        setTheme(changes[StorageVariable].newValue)
      }
    })

    // Gets the theme from the storage
    chrome.storage.sync.get([StorageVariable], ({ theme }) => {
      if (theme) {
        setTheme(theme)
      }
    })
  }, [])

  // Exposes hooks
  return [isDark, toggleTheme]
}
