/**
 * Content script
 *
 * - DOM access
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { ITest, Page, PageType } from '@/dom'
import { setBadge } from '@/scripts/background'
import { getMessage } from '@extend-chrome/messages'

const [getTest, getTestObserver] = getMessage<undefined, ITest>('getTest', { async: true })

export { getTest }

Page.getTest().then((test) => {
  console.log('getTestFromContent', test)
  if (test !== undefined) {
    // Register getTest function observer
    getTestObserver.subscribe(([,,sendResponse]) => {
      sendResponse(test)
    })

    switch (test.type) {
      case PageType.Review:
        setBadge('New').catch((error) => {
          console.log('setBadge error', error)
        })
        break

      case PageType.Attempt:
        break
    }
  }
}).catch((error) => {
  console.log('getTestFromContent error', error)
})
