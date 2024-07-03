/**
 * Content script
 *
 * - DOM access
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { Test, TestType } from '@/models'
import { getTestFromContent } from '@/utilities'
import { getMessage } from '@extend-chrome/messages'
import { setBadge } from './background'

export const [getTest, getTestStream] = getMessage<undefined, Test>('getTest', { async: true })

getTestFromContent().then((test) => {
  if (test !== undefined) {
    getTestStream.subscribe(([,,sendResponse]) => {
      sendResponse(test)
    })

    switch (test.type) {
      case TestType.Review:
        console.log('Review', test)
        setBadge(test.questions.length).catch((error) => {
          console.log('setBadge error', error)
        })
        break

      case TestType.Attempt:
        console.log('Attempt', test)
        break
    }
  }
}).catch((error) => {
  console.log('getTestFromContent error', error)
})
