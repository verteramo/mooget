/*******************************************************************************
 * Progress.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Package dependencies
import { UserAnswer } from './UserAnswer'

/**
 * User progress interface
 */
export interface Progress {
  /**
   * Quiz answers
   */
  quizId?: string

  /**
   * Current step
   */
  step: number

  /**
   * Answers
   */
  answers: UserAnswer[]
}
