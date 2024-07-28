/**
 * Content script
 *
 * - DOM access
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { store } from '@/redux/store'
import { getMessage } from '@extend-chrome/messages'

import { Quiz } from '@/core/dom/Quiz'
import { IQuiz } from '@/core/models/IQuiz'
import { handlers } from '@/dom/handlers'
import { middlewares } from '@/dom/middlewares'
import { bgSetBadge } from '@/scripts/background'
import { filterQuiz } from '@/todo/utilities'

const [
  csRequestQuiz,
  csRequestQuizObserver
] =
  /* eslint-disable-next-line @typescript-eslint/no-invalid-void-type */
  getMessage<void, IQuiz | undefined>('requestQuiz', { async: true })

async function main (): Promise<void> {
  console.log(handlers, middlewares)
  const quiz = await Quiz.extract(handlers)

  console.log('quiz', quiz)

  // Listen to the requestQuiz message from the popup
  csRequestQuizObserver.subscribe(([,,sendResponse]) => sendResponse(quiz))

  // Set the badge with new questions count
  if (quiz !== undefined) {
    const quizzes = store.getState().quizzes
    const filteredQuiz = filterQuiz(quizzes, quiz)
    const length = filteredQuiz.questions.length

    if (length > 0) {
      await bgSetBadge(length.toString())
    }
  }
}

export { csRequestQuiz }

main().catch((error) => {
  console.log('getQuiz error', error)
})
