/*******************************************************************************
 * useContentQuiz.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { useEffect, useState } from 'react'

/** Project dependencies */
import { Quiz } from '@/core/models/Quiz'
import { csRequestQuiz } from '@/scripts/content'

/**
 * Get the quiz from the content script
 */
export function useContentQuiz (): Quiz | undefined {
  const [quiz, setQuiz] = useState<Quiz>()

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
