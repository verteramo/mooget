/**
 * Background script
 *
 * - HTTP requests
 * - Badge access
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { fetchImage, fetchVersion } from '@/services'

/**
 * Background script subject
 */
enum BackgroundSubject {
  SetBadge,
  GetVersion,
  GetImage,
}

/**
 * Get version from URL
 * @param url Site URL
 * @returns Version
 */
export async function getVersion (url: string): Promise<string> {
  return await chrome.runtime.sendMessage({
    subject: BackgroundSubject.GetVersion, data: url
  })
}

/**
 * Replace images in HTML content with base64
 * @param element HTML element
 * @returns HTML content with base64 images
 */
export async function replaceImages (element: JQuery<HTMLElement>): Promise<string> {
  return await (async function () {
    let html = element.html()

    for (const img of element.find('img')) {
      html = html.replace(img.src, await chrome.runtime.sendMessage({
        subject: BackgroundSubject.GetImage, data: img.src
      }))
    }

    return html
  })()
}

export async function setBadge (text: number): Promise<void> {
  await chrome.runtime.sendMessage({
    subject: BackgroundSubject.SetBadge, data: text
  })
}
// Listen for messages
chrome.runtime.onMessage.addListener((
  { subject, data }: {
    subject: BackgroundSubject
    data?: any
  },
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
): void => {
  switch (subject) {
    // Set badge text
    case BackgroundSubject.SetBadge:{
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        chrome.action.setBadgeText({
          tabId: tab.id,
          text: data > 0 ? data.toString() : ''
        }).catch(console.error)
      })
      break
    }

    // Get version from URL
    case BackgroundSubject.GetVersion:{
      fetchVersion(data).then(sendResponse).catch(console.error)
      break
    }

    // Get image from URL
    case BackgroundSubject.GetImage:{
      fetchImage(data).then(sendResponse).catch(console.error)
      break
    }
  }
})
