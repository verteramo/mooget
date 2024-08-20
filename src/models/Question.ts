/*******************************************************************************
 * Question.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Package dependencies
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
   * Answers
   */
  answers: Answer[]

  /**
   * Feedback, if any
   */
  feedback?: string
}
