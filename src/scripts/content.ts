/*******************************************************************************
 * content.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { getMessage } from '@extend-chrome/messages'

/** Package dependencies */
import { bgFetchVersion, bgSetBadgeText } from './background'

/** Project dependencies */
import { IQuiz } from '@/core/models/IQuiz'
import handlers from '@/providers/handlers'
import middlewares from '@/providers/middlewares'
import { MoodleQuiz } from '@/providers/moodle/models/MoodleQuiz'
import { store } from '@/redux/store'
import { filterQuiz } from '@/todo/utilities'

const [
  csRequestQuiz,
  csRequestQuizObserver
] =
  /* eslint-disable-next-line @typescript-eslint/no-invalid-void-type */
  getMessage<void, IQuiz | undefined>('requestQuiz', { async: true })

async function main (): Promise<void> {
  console.log(handlers, middlewares)

  const quiz = await MoodleQuiz.extract({
    handlers, fetchVersion: bgFetchVersion
  })

  console.log('quiz', quiz)

  // Listen to the requestQuiz message from the popup
  csRequestQuizObserver.subscribe(([,,sendResponse]) => sendResponse(quiz))

  // Set the badge with new questions count
  if (quiz !== undefined) {
    const quizzes = store.getState().quizzes
    const filteredQuiz = filterQuiz(quizzes, quiz)
    const length = filteredQuiz.questions.length

    if (length > 0) {
      await bgSetBadgeText(length.toString())
    }
  }
}

export { csRequestQuiz }

main().catch((error) => {
  console.log('getQuiz error', error)
})
