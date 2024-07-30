/*******************************************************************************
 * qhTrueFalse.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Project dependencies */
import { QuestionHandler } from '@/core/parsing/Question'

/**
 * True/False question type:
 * A student is given only two choices for an answer in this kind of question: True or False.
 * The question content can include an image or html code.
 * @see https://docs.moodle.org/en/True/False_question_type
 */
export const qhTrueFalse: QuestionHandler = {
  types: ['truefalse'],
  reducer: {
    answer: ({ $element: $element, correct }): boolean => {
      return (
        correct === true &&
        $element.find('input[type=radio]').attr('checked') === 'checked'
      )
    }
  }
}
