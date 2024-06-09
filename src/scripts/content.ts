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

// Analyzer instance
const analyzer = new Analyzer()

// Get context
analyzer.getContext().then(context => {

  chrome.runtime.sendMessage({
    subject: Subject.SetBadge,
    count: context.test?.questions.length
  })


  // Listen for messages
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    switch (message.subject) {
      case Subject.GetContext:

      console.log('GetContext')
        sendResponse(context)
        break
    }
  })

})
