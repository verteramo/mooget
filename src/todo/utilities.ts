/**
 * Scripts utilities
 *
 * Like fetching Moodle version, images as base64, etc.
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import saveAs from 'file-saver'

import { Question } from '@/core/models/Question'
import { Quiz } from '@/core/models/Quiz'

/**
 * Prompt user to download quiz
 *
 * @param quiz Quiz to download
 */
export function promptQuizDownload (quiz: Quiz): void {
  saveAs(new Blob([JSON.stringify(quiz)], {
    type: 'application/json'
  }), `${quiz.name}.json`)
}

/**
 * Load JSON file
 *
 * @param file File
 * @returns Quiz
 */
export async function loadQuiz (file: File): Promise<Quiz | undefined> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        // const data = JSON.parse(e.target?.result as string)
        // const quiz = convertQuiz(data)

        // if (quiz !== undefined) {
        //   resolve(quiz)
        // }
      } catch (error) {
        reject(error)
      }
    }
    reader.readAsText(file)
  })
}

/**
 * Get flat map of question IDs
 *
 * @returns Question IDs
 */
function getQuestionIds (quizzes: Quiz[]): string[] {
  return quizzes
    .flatMap(({ questions }) => questions)
    .flatMap(({ id }) => id)
}

/**
 * Filter questions present in quizzes
 *
 * @param quizzes Quizzes
 * @param questions Questions
 * @returns Filtered questions
 */
function filterQuestions (quizzes: Quiz[], questions: Question[]): Question[] {
  const questionIds = getQuestionIds(quizzes)

  return questions.filter(({ id: currentId }) => {
    return !questionIds.some((id) => id === currentId)
  })
}

/**
 * Filter quiz's questions present in quizzes
 *
 * @param quizzes Quizzes
 * @param quiz Quiz
 * @returns Filtered quiz
 */
export function filterQuiz (quizzes: Quiz[], quiz: Quiz): Quiz {
  return {
    ...quiz,
    questions: filterQuestions(quizzes, quiz.questions)
  }
}

/**
 * Open side panel
 */
export async function openSidePanel (): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  if (tab !== undefined) {
    await chrome.sidePanel.open({ tabId: tab.id as number })
  }
}
