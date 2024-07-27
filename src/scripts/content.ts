/**
 * Content script
 *
 * - DOM access
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { handlers, IQuiz, middlewares, Quiz } from '@/dom'
import { store } from '@/redux'
import { getMessage } from '@extend-chrome/messages'
import { setBadge } from './background'
import { filterQuiz } from './utilities'

const [
  requestQuiz,
  requestQuizObserver
] =
  /* eslint-disable-next-line @typescript-eslint/no-invalid-void-type */
  getMessage<void, IQuiz | undefined>('requestQuiz', { async: true })

Quiz.extract(handlers, middlewares).then((quiz) => {
  console.log('init', quiz)

  // Listen to the requestQuiz message from the popup
  requestQuizObserver.subscribe(([,,sendResponse]) => {
    sendResponse(quiz)
  })

  // Set the badge with new questions count
  if (quiz !== undefined) {
    const quizzes = store.getState().quizzes
    const filteredQuiz = filterQuiz(quizzes, quiz)
    const length = filteredQuiz.questions.length

    if (length > 0) {
      setBadge(length.toString()).catch((error) => {
        console.log('content.ts > setBadge', error)
      })
    }
  }
}).catch((error) => {
  console.log('getQuiz error', error)
})

export { requestQuiz }
