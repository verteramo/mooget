/**
 * qhTrueFalse.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { QuestionHandler } from '@/core/dom/QuestionHandler'

/**
 * True/False question type:
 * A student is given only two choices for an answer in this kind of question: True or False.
 * The question content can include an image or html code.
 * @see https://docs.moodle.org/en/True/False_question_type
 */
export const qhTrueFalse: QuestionHandler = {
  types: ['truefalse'],
  reducer: {
    answer: ({ element, question: { correct } }): boolean => {
      return (
        correct === true &&
        element.find('input[type=radio]').attr('checked') === 'checked'
      )
    }
  }
}
