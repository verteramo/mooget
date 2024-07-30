/*******************************************************************************
 * background.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { getMessage } from '@extend-chrome/messages'

/** Project dependencies */
import { fetchImagesAsBase64 } from '@/core/utils/images'
import { fetchMoodleVersion } from '@/providers/moodle/utils/fetchMoodleVersion'

/**
 * Message observer to set the badge
 * It is called from the content script
 */
const [
  bgSetBadgeText,
  bgSetBadgeTextObserver
] = getMessage<string>('bgSetBadgeText')

bgSetBadgeTextObserver.subscribe(([text]) => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (tab !== undefined) {
      chrome.action.setBadgeText({ text, tabId: tab.id }).catch((error) => {
        console.log('setBadgeText error', error)
      })
    }
  })
})

/**
 * Message observer to get the version
 * It is called from the Page class
 */
const [
  bgFetchMoodleVersion,
  bgFetchMoodleVersionObserver
] = getMessage<string, string | undefined>('bgFetchVersion', { async: true })

bgFetchMoodleVersionObserver.subscribe(([url,,sendResponse]) => {
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
] = getMessage<JQuery<HTMLElement> | JQuery<JQuery.Node[]>, JQuery<HTMLElement> | JQuery<JQuery.Node[]>>('bgFetchImagesAsBase64', { async: true })

bgFetchImagesAsBase64Observer.subscribe(([element,,sendResponse]) => {
  fetchImagesAsBase64(element).then(sendResponse).catch((error) => {
    console.log('getImages error', error)
  })
})

/**
 * Exports
 */
export {
  bgFetchImagesAsBase64, bgFetchMoodleVersion, bgSetBadgeText
}
