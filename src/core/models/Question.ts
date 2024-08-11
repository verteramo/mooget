/*******************************************************************************
 * IQuestion.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Package dependencies */
import { Answer } from './Answer'
import { QuestionType } from './QuestionType'

/**
 * Question interface
 */
export interface Question {
  /**
   * ID
   */
  id: string

  /**
   * Type
   */
  type: QuestionType

  /**
   * Content
   */
  content: string

  /**
   * Feedback, if any
   */
  feedback?: string

  /**
   * Answer, if it can be determined;
   * it could be a boolean, a string or an array of IAnswer if there are multiple answers
   */
  answer?: Answer[]
}
