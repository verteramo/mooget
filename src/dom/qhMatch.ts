/**
 * qhMatch.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import $ from 'jquery'

import { QuestionHandler } from '@/core/dom/QuestionHandler'
import { IAnswer } from '@/core/models/IAnswer'

/**
 * Matching question type:
 * have a content area and a list of names or statements which
 * must be correctly matched against another list of names or statements.
 * @see https://docs.moodle.org/en/Matching_question_type
 */
export const qhMatch: QuestionHandler = {
  types: ['match', 'randomsamatch'],
  reducer: {
    answer: ({ element, question: { correct } }) => {
      const answer: IAnswer[] = []

      if (correct === true) {
        for (const option of element.find('table.answer > tbody > tr')) {
          const text = $(option).find('td.text').html()
          const control = $(option).find('td.control > select > option:selected').text()

          answer.push({ content: text, correct: control })
        }
      }

      return answer
    }
  }
}
