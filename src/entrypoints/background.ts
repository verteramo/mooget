/*******************************************************************************
 * background.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Project dependencies
import { fetchMoodleVersion } from '@/providers/moodle'
import { fetchImageAsBase64 } from '@/utils/images'
import { onMessage } from '@/utils/messaging'

export default defineBackground(() => {
  // Message observer to set the badge text
  onMessage('setBadgeValue', async ({ data: value }) => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true })

    if (tab?.id !== undefined) {
      const text = value === 0 ? '' : value.toString()
      await browser.action.setBadgeText({ text, tabId: tab.id })
    }
  })

  // Message observer to set the badge theme
  onMessage('setBadgeTheme', async ({ data: { color, bgcolor } }) => {
    await browser.action.setBadgeTextColor({ color })
    await browser.action.setBadgeBackgroundColor({ color: bgcolor })
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
