/*******************************************************************************
 * Question.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Package dependencies
import { AnswerType, QuestionAnswer } from '.'

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
   * HTML content of the question
   */
  content: string

  /**
   * Answers
   */
  answers: QuestionAnswer[]

  /**
   * Feedback, if any
   */
  feedback?: string
}
