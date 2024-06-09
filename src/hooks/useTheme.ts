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
   * Verify if the theme is dark
   * @returns true if the theme is dark, false otherwise
   */
  const isDark = () => theme === 'dark'

  /**
   * Toggle the theme
   */
  const toggleTheme = () => {
    chrome.storage.sync.set({
      theme: isDark() ? 'light' : 'dark'
    })
  }

  useEffect(() => {
    // Set the theme in the DOM when it changes
    document.documentElement.setAttribute('data-bs-theme', theme)
  }, [theme])

  useEffect(() => {
    // Listen for changes in the storage variable
    chrome.storage.onChanged.addListener((changes) => {
      if (changes[StorageVariable]) {
        setTheme(changes[StorageVariable].newValue)
      }
    })

    // Get the theme from the storage
    chrome.storage.sync.get([StorageVariable], ({ theme }) => {
      if (theme) {
        setTheme(theme)
      }
    })
  }, [])

  // Expose hooks
  return [isDark, toggleTheme]
}
