/*******************************************************************************
 * Question.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Package dependencies
import { Answer, AnswerType } from '.'

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
  type: AnswerType
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
