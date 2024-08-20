/*******************************************************************************
 * background.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Project dependencies
import { fetchMoodleVersion } from '@/providers/moodle'
import { fetchImageAsBase64 } from '@/utilities/images'
import { onMessage } from '@/utilities/messaging'

export default defineBackground(() => {
  // Message observer to set the badge text
  onMessage('setBadgeText', async ({ data: text }) => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true })

    if (tab !== undefined) {
      await browser.action.setBadgeText({ text, tabId: tab.id })
    }
  })

  // Message observer to set the badge text color
  onMessage('setBadgeTextColor', async ({ data: color }) => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true })

    if (tab !== undefined) {
      await browser.action.setBadgeTextColor({ color, tabId: tab.id })
    }
  })

  // Message observer to set the badge background color
  onMessage('setBadgeBackgroundColor', async ({ data: color }) => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true })

    if (tab !== undefined) {
      await browser.action.setBadgeBackgroundColor({ color, tabId: tab.id })
    }
  })

  // Message observer to get the Moodle version
  onMessage('getMoodleVersion', async ({ data: url }) => {
    return await fetchMoodleVersion(url)
  })

  // Message observer to get an image as base64
  onMessage('getImageAsBase64', async ({ data: src }) => {
    return await fetchImageAsBase64(src)
  })
})
