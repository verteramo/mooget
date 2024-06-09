/**
 * Background script
 * 
 * - HTTP requests
 * - Badge access
 * 
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import {
  Subject,
  convertImageToBase64,
  getSiteVersion,
} from "../core/Utils"

// Listens for messages
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.subject) {

    // Sets badge
    case Subject.SetBadge:
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        chrome.action.setBadgeText({
          tabId: tab.id,
          text: message.count ? message.count.toString() : ''
        })
      })
      break

    // Gets site version
    case Subject.GetVersion:
      if (message.url) {
        getSiteVersion(message.url).then(sendResponse)
      }
      break

    // Converts image to base64
    case Subject.ConvertImage:
      convertImageToBase64(message.src).then(sendResponse)
      break
  }
})
