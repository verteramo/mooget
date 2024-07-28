/**
 * useContentQuiz
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { IQuiz } from '@/core/models/IQuiz'
import { csRequestQuiz } from '@/scripts/content'
import { useEffect, useState } from 'react'

/**
 * Get the quiz from the content script
 * @returns Quiz
 */
export function useContentQuiz (): IQuiz | undefined {
  const [quiz, setQuiz] = useState<IQuiz>()

  async function initialize (): Promise<void> {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })

    if (tab !== undefined) {
      const quiz = await csRequestQuiz(undefined, { tabId: tab.id })

      if (quiz !== undefined) {
        setQuiz(quiz)
      }
    }
  }

  useEffect(function () {
    initialize().catch((error: Error) => {
      console.log('useContentQuiz.ts > initialize', error)
    })
  }, [])

  return quiz
}
