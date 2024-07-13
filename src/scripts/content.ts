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

const [requestQuiz, requestQuizObserver] = getMessage<undefined, IQuiz>('requestQuiz', { async: true })

Page.getQuiz().then((test) => {
  console.log('init', test)

  if (test !== undefined) {
    setBadge(test.questions.length.toString()).catch((error) => {
      console.error('setBadge error', error)
    })

    requestQuizObserver.subscribe(([,,sendResponse]) => {
      sendResponse(test)
    })
  }
}).catch((error) => {
  console.log('init error', error)
})

export { requestQuiz }
