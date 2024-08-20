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
import { onMessage, sendMessage } from '@/utilities/messaging'
import { filterQuiz } from '@/utilities/quizzes'

export default defineContentScript({
  matches: ['<all_urls>'],
  async main () {
    console.log('Content script loaded')

    async function main (): Promise<void> {
      const quiz = await parse([moodleProvider])

      console.log('Welcome', quiz)

      if (quiz !== undefined) {
        onMessage('getQuiz', () => quiz)

        useQuizCollectionStore.subscribe(({ items }) => items, (items) => {
          const length = filterQuiz(items, quiz).questions.length
          const text = length === 0 ? '' : length.toString()

          sendMessage('setBadgeText', text).catch(console.error)
        }, { fireImmediately: true })
      }
    }
    await sendMessage('setBadgeTextColor', common.white)
    useConfigStore.subscribe(({ color }) => color, (color) => {
      sendMessage('setBadgeBackgroundColor', color).catch(console.error)
    }, { fireImmediately: true })

    main().catch(console.error)
  }
})
