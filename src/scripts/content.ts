/**
 * Content script
 * DOM access
 * 
 * @link https://github.com/verteramo
 * @license GNU GPLv3
 */

import { Subject } from '../core/Utils'
import { Analyzer, TestType } from '../core/Analyzer'

// Analyzer instance
const analyzer = new Analyzer()

// Get context
analyzer.getContext().then(context => {

  console.log(context)

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (context.type === TestType.Review) {
      // Set badge
      chrome.runtime.sendMessage({
        subject: Subject.SetBadge,
        tabId: tab.id,
        count: context.test.questions.length
      })
    } else {
      // Remove badge
      chrome.runtime.sendMessage({
        subject: Subject.SetBadge,
        tabId: tab.id,
        count: 0
      })
    }
  })

  // Listen for messages
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    switch (message.subject) {
      case Subject.GetContext:
        sendResponse(context)
        break
    }
  })

})
