/*******************************************************************************
 * qhMatch.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import $ from 'jquery'

/** Project dependencies */
import { IAnswer } from '@/core/models/IAnswer'
import { QuestionHandler } from '@/core/parsing/Question'

/**
 * Matching question type:
 * have a content area and a list of names or statements which
 * must be correctly matched against another list of names or statements.
 * @see https://docs.moodle.org/en/Matching_question_type
 */
export const qhMatch: QuestionHandler = {
  types: ['match', 'randomsamatch'],
  reducer: {
    answer: ({ $element: $element, correct }) => {
      const answer: IAnswer[] = []

      if (correct === true) {
        for (const option of $element.find('table.answer > tbody > tr')) {
          const text = $(option).find('td.text').html()
          const control = $(option).find('td.control > select > option:selected').text()

          answer.push({ content: text, correct: control })
        }
      }

      return answer
    }
  }
}
