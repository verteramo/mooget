/*******************************************************************************
 * quizzes.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import saveAs from 'file-saver'

// Package dependencies

// Project dependencies
import { Quiz } from '@/models'

/**
 * Prompt user to download quiz
 *
 * @param quiz Quiz to download
 */
export function saveQuizAsJson (quiz: Quiz): void {
  saveAs(new Blob(
    [JSON.stringify(quiz)], { type: 'application/json' }
  ), `${quiz.name}.json`)
}

/**
 * Validate quiz object
 *
 * @param object Object
 * @returns True if object is a quiz
 */
export function isQuiz (object: any): object is Quiz {
  return (
    // Validate name
    typeof object.name === 'string' &&
    object.name.length > 0 &&

    // Validate category
    typeof object.category === 'string' &&
    object.category.length > 0 &&

    // Validate questions
    Array.isArray(object.questions) &&
    object.questions.length > 0
  )
}

/**
 * Load JSON file
 *
 * @param file File
 * @returns Quiz
 */
export async function readQuiz (file: File): Promise<Quiz | undefined> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function (event) {
      if (typeof event.target?.result === 'string') {
        const data = JSON.parse(event.target.result)

        if (isQuiz(data)) {
          resolve(data)
        }
      }
    }

    reader.onerror = function () {
      reject(this.error)
    }

    reader.readAsText(file)
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
  const questionIds = quizzes
    .flatMap(({ questions }) => questions)
    .flatMap(({ id }) => id)

  return {
    ...quiz,
    questions: quiz.questions.filter(
      ({ id: currentId }) =>
        !questionIds.some((id) => id === currentId)
    )
  }
}
