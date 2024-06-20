/**
 * useDarkMode
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
*/

import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

export function useTheme ({
  area
}: {
  area: chrome.storage.StorageArea
} = {
  area: chrome.storage.sync
}): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = (): void => {
    area.set({
      theme: theme === 'light' ? 'dark' : 'light'
    }).catch(console.error)
  }

  const handleStorageChanged = (changes: { [key: string]: any }): void => {
    if (changes.theme !== undefined) {
      setTheme(changes.theme.newValue)
    }
  }

  useEffect(() => {
    area.get(['theme'], ({ theme }) => {
      if (theme !== undefined) {
        setTheme(theme)
      }
    })

    chrome.storage.onChanged.addListener(handleStorageChanged)

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChanged)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }, [theme])

  return [theme, toggleTheme]
}
