/*******************************************************************************
 * content.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { common } from '@mui/material/colors'

// Package dependencies
import { parse } from '@/parsing'
import { moodleProvider } from '@/providers/moodle'
import { useConfigStore, useQuizCollectionStore } from '@/stores'

export default defineContentScript({
  matches: ['<all_urls>'],
  async main () {
    // Set badge text color
    await sendMessage('setBadgeTextColor', common.white)

    // Listen and update the badge background color
    useConfigStore.subscribe(({ color }) => color, (color) => {
      const colorKey = color as keyof typeof Colors
      sendMessage('setBadgeBackgroundColor', Colors[colorKey]).catch(console.error)
    }, { fireImmediately: true })

    const quiz = await parse([moodleProvider])
    onMessage('getQuiz', () => quiz)

    // Welcome message
    console.log('Welcome', quiz)

    if (quiz !== undefined) {
      // Listen and update the badge text with the number of questions
      useQuizCollectionStore.subscribe(({ items }) => items, (items) => {
        const length = filterQuiz(items, quiz).questions.length
        const text = length === 0 ? '' : length.toString()

        sendMessage('setBadgeText', text).catch(console.error)
      }, { fireImmediately: true })
    }
  }
})
