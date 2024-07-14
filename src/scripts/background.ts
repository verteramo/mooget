/**
 * Background script
 *
 * - Observes messages
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { fetchVersion, replaceImages } from '@/scripts/utilities'
import { getMessage } from '@extend-chrome/messages'

/**
 * Message observer to set the badge
 * It is called from the content script
 *
 * @param text Badge text
 */

const [
  setBadge,
  setBadgeObserver
] = getMessage<string>('setBadge')

setBadgeObserver.subscribe(([text]) => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.action.setBadgeText({ text, tabId: tab.id }).catch((error) => {
      console.log('setBadge background error', error)
    })
  })
})

/**
 * Message observer to get the version
 * It is called from the Page class
 *
 * @param url URL
 */

const [
  getVersion,
  getVersionObserver
] = getMessage<string, string | undefined>('getVersion', { async: true })

getVersionObserver.subscribe(([url,,sendResponse]) => {
  fetchVersion(url).then(sendResponse).catch((error) => {
    console.log('getVersion error', error)
  })
})

/**
 * Message observer to get images as base64
 * It is called from the Page and Question classes
 *
 * @param element HTML element
 * @returns HTML element with replaced images as base64
 */

const [
  getImages,
  getImagesObserver
] = getMessage<JQuery<HTMLElement>, JQuery<HTMLElement>>('getImages', { async: true })

getImagesObserver.subscribe(([element,,sendResponse]) => {
  replaceImages(element).then(sendResponse).catch((error) => {
    console.log('getImages error', error)
  })
})

/**
 * Exports
 */

export {
  getImages, getVersion, setBadge
}
