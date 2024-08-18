/*******************************************************************************
 * content.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { getMessage } from '@extend-chrome/messages'
import { common } from '@mui/material/colors'

/** Package dependencies */
import {
  bgSetBadgeBackgroundColor,
  bgSetBadgeText,
  bgSetBadgeTextColor
} from './background'

/** Project dependencies */
import { Quiz } from '@/core/models'
import { parse } from '@/core/parsing'
import { useConfigStore, useQuizCollectionStore } from '@/core/stores'
import { filterQuiz } from '@/core/utilities/quizzes'
import { moodleProvider } from '@/providers/moodle'

const [
  csRequestQuiz,
  csRequestQuizObserver
] =
  /* eslint-disable-next-line @typescript-eslint/no-invalid-void-type */
  getMessage<void, Quiz | undefined>('requestQuiz', { async: true })

async function main (): Promise<void> {
  const quiz = await parse([moodleProvider])

  console.log('Welcome', quiz)

  if (quiz !== undefined) {
    csRequestQuizObserver.subscribe(([,,sendResponse]) => {
      sendResponse(quiz)
    })

    useQuizCollectionStore.subscribe(({ items }) => items, (items) => {
      const length = filterQuiz(items, quiz).questions.length
      const text = length === 0 ? '' : length.toString()

      bgSetBadgeText(text).catch(console.error)
    }, { fireImmediately: true })
  }
}

export { csRequestQuiz }

bgSetBadgeTextColor(common.white).catch(console.error)

useConfigStore.subscribe(({ color }) => color, (color) => {
  bgSetBadgeBackgroundColor(color).catch(console.error)
}, { fireImmediately: true })

main().catch(console.error)
