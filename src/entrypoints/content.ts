/*******************************************************************************
 * content.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Package dependencies
import { parse } from '@/parsing'
import { moodleProvider } from '@/providers/moodle'
import { filterQuiz } from '@/stores/useQuizStore'
import { onMessage } from '@/utils/messaging'

export default defineContentScript({
  matches: ['<all_urls>'],
  async main () {
    await sendMessage('setBadgeTheme', {
      color: '#fff',
      bgcolor: '#333'
    })

    const quiz = await parse([moodleProvider])
    onMessage('getQuiz', () => quiz)

    // Welcome message
    console.log('Quiz captured:', quiz)

    if (quiz !== undefined) {
      await sendMessage('setBadgeValue', filterQuiz(quiz).questions.length)
    }
  }
})
