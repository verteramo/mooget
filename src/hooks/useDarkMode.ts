/**
 * useDarkMode
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
*/

import { useState, useEffect } from 'react'

export default function useDarkMode (): [boolean, () => void] {
  const [dark, setDark] = useState(async () => {
    return await new Promise<boolean>((resolve) => {
      chrome.storage.sync.get(['dark'], ({ dark }) => {
        resolve(dark ?? false)
      })
    })
  })

  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-bs-theme')
    }
  }, [dark])

  useEffect(() => {
    chrome.storage.sync.get(['dark'], ({ dark }) => {
      if (dark != null) {
        setDark(dark)
      }
    })

    chrome.storage.onChanged.addListener(changes => {
      if (changes.dark.newValue !== undefined) {
        setDark(changes.dark.newValue)
      }
    })
  }, [])

  return [dark, (): void => {
    chrome.storage.sync.set({ dark: !dark }).catch(console.error)
  }]
}
