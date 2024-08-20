/*******************************************************************************
 * useContentQuiz.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { useEffect, useState } from 'react'

// Project dependencies
import { Quiz } from '@/models'
import { sendMessage } from '@/utilities/messaging'

/**
 * Request quiz from the content script
 */
export function useContentQuiz (): Quiz | undefined {
  const [quiz, setQuiz] = useState<Quiz>()

  async function getQuiz (callback: (quiz: Quiz) => void): Promise<void> {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true })

    if (tab?.id !== undefined) {
      const quiz = await sendMessage('getQuiz', undefined, tab.id)
      callback(quiz)
    }
  }

  useEffect(function () {
    getQuiz(setQuiz).catch(console.error)
  }, [])

  return quiz
}
