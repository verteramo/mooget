/**
 * Content script
 *
 * - DOM access
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { IQuiz, Page } from '@/dom'
import { getMessage } from '@extend-chrome/messages'
import { setBadge } from './background'

/* eslint-disable-next-line @typescript-eslint/no-invalid-void-type */
const [requestQuiz, requestQuizObserver] = getMessage<void, IQuiz>('requestQuiz', { async: true })

function handleQuiz (quiz: IQuiz | undefined): void {
  console.log('init', quiz)
  if (quiz !== undefined) {
    setBadge(quiz.questions.length.toString()).catch((error) => {
      console.log('setBadge content error', error)
    })

    requestQuizObserver.subscribe(([,,sendResponse]) => {
      sendResponse(quiz)
    })
  }
}

Page.getQuiz().then(handleQuiz).catch((error) => {
  console.error('getQuiz error', error)
})

export { requestQuiz }
