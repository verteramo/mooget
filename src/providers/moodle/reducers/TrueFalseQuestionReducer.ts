/*******************************************************************************
 * qhTrueFalse.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Project dependencies */
import { QuestionType } from '@/core/models/QuestionType'
import { QuestionReducerMap } from '@/core/parsing/QuestionReducer'

/**
 * True/False question type:
 * A student is given only two choices for an answer in this kind of question: True or False.
 * The question content can include an image or html code.
 * @see https://docs.moodle.org/en/True/False_question_type
 */
export const TrueFalseQuestionReducer: QuestionReducerMap = {
  [QuestionType.TrueFalse]: {
    answer: ({ element, correct }): boolean => {
      return (
        correct === true &&
        element.querySelector('input[type=radio]')
          ?.attributes.getNamedItem('checked')
          ?.value === 'checked'
      )
    }
  }
}
