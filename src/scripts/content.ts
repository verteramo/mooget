/*******************************************************************************
 * content.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { getMessage } from '@extend-chrome/messages'

/** Package dependencies */
import { bgSetBadgeText } from './background'

/** Project dependencies */
import { Quiz } from '@/core/models/Quiz'
import { MoodleQuizParser } from '@/providers/moodle/parsing/MoodleQuizParser'
import { store } from '@/redux/store'
import { filterQuiz } from '@/todo/utilities'
import { parseQuiz } from '@/core/parsing/QuizParser'

const [
  csRequestQuiz,
  csRequestQuizObserver
] =
  /* eslint-disable-next-line @typescript-eslint/no-invalid-void-type */
  getMessage<void, Quiz | undefined>('requestQuiz', { async: true })

export { csRequestQuiz }

async function main (): Promise<void> {
  const quiz = await parseQuiz([
    MoodleQuizParser
  ])

  if (quiz !== undefined) {
    csRequestQuizObserver.subscribe(([,,sendResponse]) => sendResponse(quiz))

    const quizzes = store.getState().quizzes
    const filteredQuiz = filterQuiz(quizzes, quiz)
    const length = filteredQuiz.questions.length

    if (length > 0) {
      await bgSetBadgeText(length.toString())
    }
  }
}

main().catch((error) => {
  console.log('getQuiz error', error)
})
