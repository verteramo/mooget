/**
 * Background script
 * HTTP requests
 * Badge access
 * 
 * @link https://github.com/verteramo
 * @license GNU GPLv3
 */

import {
  Subject,
  getSiteVersion,
  convertImageToBase64,
} from "../core/Utils"

// Listen for messages
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.subject) {
    // Set badge
    case Subject.SetBadge:
      chrome.action.setBadgeText({
        tabId: message.tabId,
        text: message.count ? message.count.toString() : ''
      })
      break

    // Get site version
    case Subject.GetVersion:
      if (message.url) {
        getSiteVersion(message.url).then(sendResponse)
      }
      break

    // Convert image to base64
    case Subject.ConvertImage:
      convertImageToBase64(message.src).then(sendResponse)
      break
  }
})
