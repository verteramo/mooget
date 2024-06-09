/**
 * useTheme
 * 
 * @link https://github.com/verteramo
 * @license GNU GPLv3
 */

import { useEffect, useState } from 'react';

/** Theme type */
type Theme = 'light' | 'dark'

/**
 * Hook to manage the theme of the extension
 * @returns [isDark, toggleTheme]
 */
export function useTheme(): [() => boolean, () => void] {

  // Storage variable
  const StorageVariable = 'theme'

  // Theme state
  const [theme, setTheme] = useState<Theme>('light')

  /**
   * Verify if the theme is dark
   * @returns true if the theme is dark
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

  // Set the theme in the DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }, [theme])

  useEffect(() => {
    // Listener for changes in the storage
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
    }
    )
  }, [])

  // Return the theme and the toggle function
  return [
    isDark,
    toggleTheme
  ]
}
