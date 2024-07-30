/*******************************************************************************
 * qhText.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Project dependencies */
import { QuestionHandler } from '@/core/parsing/Question'

/**
 * Short-Answer question type:
 * The student types in a word or phrase in .esponse to a question (that may include an image)
 * Answers may or may not be case sensitive.
 * The answer could be a word or a phrase, but it must match one of your acceptable answers exactly.
 * @see https://docs.moodle.org/en/Short-Answer_question_type
 *
 * Numerical question type:
 * Looks just like a short-answer question.
 * @see https://docs.moodle.org/en/Numerical_question_type
 *
 * Calculated question type:
 * The main purpose of the calculated question is to create multiple versions with different numerical values.
 * Could be replaced by the numerical question type instead.
 * @see https://docs.moodle.org/en/Calculated_question_type
 *
 * Essay question type:
 * Provides the option of answering by uploading one or more files and/or entering text online.
 * @see https://docs.moodle.org/en/Essay_question_type
 */
export const qhText: QuestionHandler = {
  types: ['shortanswer', 'numerical', 'calculated', 'essay'],
  reducer: {
    answer: ({ $element: $element, rightanswer }): string => {
      return rightanswer ??
      $element.find('input[type=text]').val()?.toString() ??
      $element.find('div.answer > div[role=textbox]').html()
    }
  }
}
