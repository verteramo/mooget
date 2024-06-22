/**
 * Content script
 *
 * - DOM access
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { Test, TestType } from '@/models'
import { setBadge } from './background'
import { getTest } from '@/core/Scraping'

enum ContentSubject {
  GetTest,
}

export async function getITest (): Promise<Test> {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  })
  return await chrome.tabs.sendMessage(tab.id as number, {
    subject: ContentSubject.GetTest
  })
}

console.log('Content script')

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
