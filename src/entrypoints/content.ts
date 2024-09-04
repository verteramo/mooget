/*******************************************************************************
 * content.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Package dependencies
import { Quiz } from '@/models'
import { parse } from '@/parsing'
import { moodleProvider } from '@/providers/moodle'
import quizStore, { filterQuiz } from '@/stores/quizStore'
import { onMessage, sendMessage } from '@/utils/messaging'
import { subscribeKey } from 'valtio/utils'

async function setBadgeText (quiz: Quiz): Promise<void> {
  const length = filterQuiz(quiz).questions.length
  const text = length === 0 ? '' : length.toString()

  await sendMessage('setBadgeText', text)
}

export default defineContentScript({
  matches: ['<all_urls>'],
  async main () {
    console.log('Content script loaded')

    // Set badge text and background color
    await sendMessage('setBadgeTextColor', '#fff')
    await sendMessage('setBadgeBackgroundColor', '#333')

    const quiz = await parse([moodleProvider])
    onMessage('getQuiz', () => quiz)

    // Welcome message
    console.log('Welcome', quiz)

    if (quiz !== undefined) {
      setBadgeText(quiz).catch(console.error)

      subscribeKey(quizStore, 'list', () => {
        setBadgeText(quiz).catch(console.error)
        console.log('Quiz list updated')
      })
    }
  }
})
