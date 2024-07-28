/**
 * Background script
 *
 * - Observes messages
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { fetchImagesAsBase64 } from '@/services/fetchImagesAsBase64'
import { fetchMoodleVersion } from '@/services/fetchMoodleVersion'
import { getMessage } from '@extend-chrome/messages'

/**
 * Message observer to set the badge
 * It is called from the content script
 */
const [
  bgSetBadge,
  bgSetBadgeObserver
] = getMessage<string>('setBadge')

bgSetBadgeObserver.subscribe(([text]) => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (tab !== undefined) {
      chrome.action.setBadgeText({ text, tabId: tab.id }).catch((error) => {
        console.log('setBadge error', error)
      })
    }
  })
})

/**
 * Message observer to get the version
 * It is called from the Page class
 */
const [
  bgFetchVersion,
  bgFetchVersionObserver
] = getMessage<string, string | undefined>('getVersion', { async: true })

bgFetchVersionObserver.subscribe(([url,,sendResponse]) => {
  fetchMoodleVersion(url).then(sendResponse).catch((error) => {
    console.log('getVersion error', error)
  })
})

/**
 * Message observer to get images as base64
 * It is called from the Page and Question classes
 */
const [
  bgFetchImagesAsBase64,
  bgFetchImagesAsBase64Observer
] = getMessage<JQuery<HTMLElement> | JQuery<JQuery.Node[]>, JQuery<HTMLElement> | JQuery<JQuery.Node[]>>('getImages', { async: true })

bgFetchImagesAsBase64Observer.subscribe(([element,,sendResponse]) => {
  fetchImagesAsBase64(element).then(sendResponse).catch((error) => {
    console.log('getImages error', error)
  })
})

/**
 * Exports
 */
export {
  bgSetBadge,
  bgFetchVersion,
  bgFetchImagesAsBase64
}
