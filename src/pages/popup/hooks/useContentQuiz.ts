/*******************************************************************************
 * useContentQuiz.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { useEffect, useState } from 'react'

// Project dependencies
import { Quiz } from '@/core/models'
import { csRequestQuiz } from '@/scripts/content'

/**
 * Request quiz from the content script
 */
export function useContentQuiz (): Quiz | undefined {
  const [quiz, setQuiz] = useState<Quiz>()

  async function requestQuiz (callback: (quiz: Quiz) => void): Promise<void> {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })

    if (tab !== undefined) {
      const quiz = await csRequestQuiz(undefined, { tabId: tab.id })

      if (quiz !== undefined) {
        callback(quiz)
      }
    }
  }

  useEffect(function () {
    requestQuiz(setQuiz).catch(console.error)
  }, [])

  return quiz
}
