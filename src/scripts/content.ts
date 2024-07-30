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
import { IQuiz } from '@/core/models/IQuiz'
import { parseQuiz } from '@/core/parsing/parseQuiz'
import { MoodleQuestionParser } from '@/providers/moodle/parsing/MoodleQuestionParser'
import { MoodleQuizProvider } from '@/providers/moodle/parsing/MoodleQuizProvider'
import { store } from '@/redux/store'
import { filterQuiz } from '@/todo/utilities'
import { DaypoQuizProvider } from '@/providers/daypo/parsing/DaypoQuizProvider'
import { DaypoQuestionParser } from '@/providers/daypo/parsing/DaypoQuestionParser'

const [
  csRequestQuiz,
  csRequestQuizObserver
] =
  /* eslint-disable-next-line @typescript-eslint/no-invalid-void-type */
  getMessage<void, IQuiz | undefined>('requestQuiz', { async: true })

async function main (): Promise<void> {
  const quiz = await parseQuiz([
    [MoodleQuizProvider, MoodleQuestionParser],
    [DaypoQuizProvider, DaypoQuestionParser]
  ])

  console.log('quiz', quiz)

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

export { csRequestQuiz }

main().catch((error) => {
  console.log('getQuiz error', error)
})
