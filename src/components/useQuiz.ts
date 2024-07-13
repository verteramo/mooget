/**
 * useQuiz
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { IQuiz } from '@/dom'
import { requestQuiz } from '@/scripts/content'
import { useEffect, useState } from 'react'

/**
 * useQuiz
 * Get the quiz
 * @returns Quiz and setQuizName
 */
export function useQuiz (): [
  IQuiz | undefined,
  (name: string) => void,
  (category: string) => void
] {
  const [quiz, setQuiz] = useState<IQuiz | undefined>()

  /**
   * Set the quiz category
   * @param category Quiz category
   */
  function setCategory (category: string): void {
    if (quiz !== undefined) {
      setQuiz({ ...quiz, category })
    }
  }

  /**
   * Set the quiz name
   * @param name Quiz name
   */
  function setName (name: string): void {
    if (quiz !== undefined) {
      setQuiz({ ...quiz, name })
    }
  }

  async function initialize (): Promise<void> {
    // Request the quiz
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const quiz = await requestQuiz(undefined, { tabId: tab.id })

    if (quiz !== undefined) {
      setQuiz(quiz)
    }
  }

  // Get the quiz on mount
  useEffect(function () {
    initialize().catch((error) => {
      console.error('useQuiz error', error)
    })
  }, [])

  return [quiz, setCategory, setName]
}
