import { useEffect, useState } from 'react';
import { Subject } from '../core/Constants';

type Theme = 'light' | 'dark'

export function ThemeHook() {
  const [theme, setTheme] = useState<Theme>('light')

  const isDark = () => theme === 'dark'

  const initTheme = async () => {
    setTheme(await chrome.runtime.sendMessage({
      subject: Subject.GetTheme,
    }))
  }

  const toggleTheme = async () => {
    setTheme(await chrome.runtime.sendMessage({
      subject: Subject.SetTheme,
      theme: isDark() ? 'light' : 'dark',
    }))
  }

  const applyTheme = (theme: Theme) => {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }

  // Get theme from storage
  useEffect(() => { initTheme() }, [])

  // Set theme on document
  useEffect(() => applyTheme(theme), [theme])

  return {
    isDark,
    toggleTheme
  }
}
