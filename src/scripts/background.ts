/*******************************************************************************
 * background.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { getMessage } from '@extend-chrome/messages'

/** Project dependencies */
import { fetchMoodleVersion } from '@/providers/moodle/utils/fetchMoodleVersion'
import { fetchImagesAsBase64 } from '@/utils/images'

/**
 * Message observer to set the badge text
 */
const [
  bgSetBadgeText,
  bgSetBadgeTextObserver
] = getMessage<string>('bgSetBadgeText')

async function setBadgeText (text: string): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  if (tab !== undefined) {
    await chrome.action.setBadgeText({ text, tabId: tab.id })
  }
}

bgSetBadgeTextObserver.subscribe(([text]) => {
  setBadgeText(text).catch((error) => {
    console.log('setBadgeText', error)
  })
})

/**
 * Message observer to set the badge text color
 */
const [
  bgSetBadgeTextColor,
  bgSetBadgeTextColorObserver
] = getMessage<string>('bgSetBadgeTextColor')

async function setBadgeTextColor (color: string): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  if (tab !== undefined) {
    await chrome.action.setBadgeTextColor({ color, tabId: tab.id })
  }
}

bgSetBadgeTextColorObserver.subscribe(([color]) => {
  setBadgeTextColor(color).catch((error) => {
    console.log('setBadgeTextColor', error)
  })
})

/**
 * Message observer to set the badge background color
 */
const [
  bgSetBadgeBackgroundColor,
  bgSetBadgeBackgroundColorObserver
] = getMessage<string>('bgSetBadgeColor')

async function setBadgeBackgroundColor (color: string): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  if (tab !== undefined) {
    await chrome.action.setBadgeBackgroundColor({ color, tabId: tab.id })
  }
}

bgSetBadgeBackgroundColorObserver.subscribe(([color]) => {
  setBadgeBackgroundColor(color).catch((error) => {
    console.log('setBadgeBackgroundColor', error)
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
    console.log('fetchMoodleVersion', error)
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
    console.log('fetchImagesAsBase64', error)
  })
})

/**
 * Exports
 */
export {
  bgFetchImagesAsBase64, bgFetchMoodleVersion, bgSetBadgeBackgroundColor, bgSetBadgeText,
  bgSetBadgeTextColor
}

