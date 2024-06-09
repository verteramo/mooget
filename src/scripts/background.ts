/**
 * Background script
 * 
 * - HTTP requests
 * - Badge access
 * 
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import { Subject, convertImageToBase64, getSiteVersion, } from "../core/Utils"

// Listen for messages
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.subject) {

    // Set badge
    case Subject.SetBadge:
      const count: number = message.count
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        chrome.action.setBadgeText({
          tabId: tab.id,
          text: count ? count.toString() : ''
        })
      })
      break

    // Get site version
    case Subject.GetVersion:
      const url: string = message.url
      if (url) {
        getSiteVersion(url).then(sendResponse)
      }
      break

    // Convert image to base64
    case Subject.ConvertImage:
      const src: string = message.src
      convertImageToBase64(src).then(sendResponse)
      break
  }
})
