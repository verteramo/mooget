/**
 * Content script
 * 
 * - DOM access
 * 
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import { Subject } from '../core/Utils'
import { Analyzer } from '../core/Analyzer'

// Instantiate Analyzer and get context
new Analyzer().getContext().then(context => {

  // Send questions length to background to set badge
  chrome.runtime.sendMessage({
    subject: Subject.SetBadge,
    count: context.test?.questions.length
  })

  // Listen for messages
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    switch (message.subject) {

      // Send context to popup
      case Subject.GetContext:
        sendResponse(context)
        break
    }
  })

})
