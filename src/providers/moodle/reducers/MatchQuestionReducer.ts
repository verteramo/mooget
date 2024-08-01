/*******************************************************************************
 * qhMatch.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */

/** Project dependencies */
import { Answer } from '@/core/models/Answer'
import { QuestionType } from '@/core/models/QuestionType'
import { QuestionReducerMap } from '@/core/parsing/QuestionReducer'

/**
 * Matching question type:
 * have a content area and a list of names or statements which
 * must be correctly matched against another list of names or statements.
 * @see https://docs.moodle.org/en/Matching_question_type
 */
export const MatchQuestionReducer: QuestionReducerMap = {
  [QuestionType.Match]: {
    answer: ({ node: element, correct }) => {
      const answer: Answer[] = []

      if (correct === true) {
        for (const option of element.querySelectorAll('table.answer > tbody > tr')) {
          const text = option.querySelector('td.text')?.textContent
          const control = option.querySelector('td.control')?.textContent

          if (text != null && control != null) {
            answer.push({ content: text, correct: control })
          }
        }
      }

      return answer
    }
  }
}
