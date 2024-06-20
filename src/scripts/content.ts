/**
 * Content script
 *
 * - DOM access
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { ITest, TestType, getTest } from '../core/Scraping'
import { setBadge } from './background'

enum ContentSubject {
  GetTest,
}

export async function getITest (): Promise<ITest> {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  })
  return await chrome.tabs.sendMessage(tab.id as number, {
    subject: ContentSubject.GetTest
  })
}

getTest().then((test) => {
  console.log(test)

  chrome.runtime.onMessage.addListener((
    { subject }: { subject: ContentSubject },
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ): void => {
    switch (subject) {
      case ContentSubject.GetTest:
        sendResponse(test)
        break
    }
  })

  switch (test.type) {
    case TestType.Attempt:
      console.log('Attempt page')
      break

    case TestType.Review:
      console.log('Review page')
      setBadge(test.questions.length).catch(console.error)
      break
  }
}).catch(console.error)
