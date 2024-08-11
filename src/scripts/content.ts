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
import { parseQuiz } from '@/core/parsing/QuizParser'
import { equalQuizzes, filterQuiz } from '@/core/utils/quizzes'
import { MoodleQuizParser } from '@/providers/moodle/parsing/MoodleQuizParser'
import { store } from '@/redux/store'

const [
  csRequestQuiz,
  csRequestQuizObserver
] =
  /* eslint-disable-next-line @typescript-eslint/no-invalid-void-type */
  getMessage<void, Quiz | undefined>('requestQuiz', { async: true })

export { csRequestQuiz }

let currentQuizzes: Quiz[] = []

async function main (): Promise<void> {
  const quiz = await parseQuiz([
    MoodleQuizParser
  ])

  console.log('Welcome', quiz)

  if (quiz !== undefined) {
    csRequestQuizObserver.subscribe(([,,sendResponse]) => sendResponse(quiz))

    store.subscribe(() => {
      console.log('content.ts observer')
      const { quizzes } = store.getState()

      if (!equalQuizzes(quizzes, currentQuizzes)) {
        console.log('content.ts observer hasNewQuestions')
        currentQuizzes = quizzes
        const filteredQuiz = filterQuiz(currentQuizzes, quiz)
        const length = filteredQuiz.questions.length

        if (length > 0) {
          bgSetBadgeText(length.toString()).catch((error) => {
            console.log('bgSetBadgeText error', error)
          })
        }
      }
    })
  }
}

main().catch((error) => {
  console.log('getQuiz error', error)
})
