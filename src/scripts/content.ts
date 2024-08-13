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
import { Quiz } from '@/core/models/Quiz'
import { parseQuiz } from '@/core/parsing/QuizParser'
import { MoodleQuizParser } from '@/providers/moodle/parsing/MoodleQuizParser'
import { store } from '@/redux/store'
import { equalQuizzes, filterQuiz } from '@/utils/quizzes'

const [
  csRequestQuiz,
  csRequestQuizObserver
] =
  /* eslint-disable-next-line @typescript-eslint/no-invalid-void-type */
  getMessage<void, Quiz | undefined>('requestQuiz', { async: true })

const [
  csAnswerQuiz,
  csAnswerQuizObserver
] =
  /* eslint-disable-next-line @typescript-eslint/no-invalid-void-type */
  getMessage<void, void>('answerQuiz', { async: true })

let currentPrimaryColor: string = ''

async function listenPrimaryColor (): Promise<void> {
  const primaryColor = store.getState().config.primaryColor

  if (primaryColor !== currentPrimaryColor) {
    currentPrimaryColor = primaryColor
    await bgSetBadgeBackgroundColor(currentPrimaryColor)
  }
}

let currentQuizzes: Quiz[] = []

async function listenQuizzesChange (quiz: Quiz): Promise<void> {
  const quizzes = store.getState().quizzes

  if (quizzes.length === 0 || !equalQuizzes(quizzes, currentQuizzes)) {
    currentQuizzes = quizzes
    const filteredQuiz = filterQuiz(currentQuizzes, quiz)
    const length = filteredQuiz.questions.length

    if (length > 0) {
      await bgSetBadgeText(length.toString())
    }
  }
}

async function main (): Promise<void> {
  store.subscribe(() => {
    listenPrimaryColor().catch(console.error)
  })

  const quiz = await parseQuiz([MoodleQuizParser])

  console.log('Welcome', quiz)

  if (quiz !== undefined) {
    csRequestQuizObserver.subscribe(([,,sendResponse]) => {
      sendResponse(quiz)
    })

    csAnswerQuizObserver.subscribe(() => {
    })

    store.subscribe(() => {
      listenQuizzesChange(quiz).catch(console.error)
    })
  }
}

export {
  csAnswerQuiz, csRequestQuiz
}

bgSetBadgeTextColor(common.white).catch(console.error)

main().catch(console.error)
