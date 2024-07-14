/**
 * useQuiz
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { IQuiz } from '@/dom'
import { setBadge } from '@/scripts/background'
import { requestQuiz } from '@/scripts/content'
import { filterQuestions } from '@/scripts/utilities'
import { useEffect, useState } from 'react'

/**
 * useQuiz
 * Get the quiz
 * @returns Quiz and setQuizName
 */
export function useQuiz (quizzes: IQuiz[]): [
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
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
    const quiz = await requestQuiz(undefined, { tabId: tab.id })

    if (quiz !== undefined) {
      const prevLength = quiz.questions.length
      const newQuiz = {
        ...quiz,
        questions: filterQuestions(quiz, quizzes)
      }

      if (prevLength !== newQuiz.questions.length) {
        setBadge(newQuiz.questions.length.toString()).catch((error) => {
          console.log('useQuiz setBadge error', error)
        })
      }

      setQuiz(quiz)
    }
  }

  // Get the quiz on mount
  useEffect(function () {
    initialize().catch((error) => {
      console.log('useQuiz error', error)
    })
  }, [])

  return [quiz, setCategory, setName]
}
