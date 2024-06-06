import { useEffect, useState } from 'react';
import { Storage } from '../core/Constants';

type Theme = 'light' | 'dark'

export function ThemeHook() {
  const [theme, setTheme] = useState<Theme>('light')

  const isDark = () => theme === 'dark'

  // Toggle theme and save it to storage
  const toggleTheme = () => {
    chrome.storage.sync.set({
      theme: isDark() ? 'light' : 'dark'
    })
  }

  // On mount, get theme from storage
  useEffect(() => {
    chrome.storage.sync.get(
      [Storage.Theme],
      ({ theme }) => {
        if (theme) {
          setTheme(theme)
        }
      }
    )
  }, [])

  // On theme change, apply it to document
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }, [theme])

  // Listen for theme changes
  chrome.storage.onChanged.addListener((changes) => {
    if (changes[Storage.Theme]) {
      setTheme(changes[Storage.Theme].newValue)
    }
  })

  return {
    isDark,
    toggleTheme
  }
}
