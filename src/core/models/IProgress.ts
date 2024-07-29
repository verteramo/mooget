/*******************************************************************************
 * IProgress.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Package dependencies */
import { IQuiz } from './IQuiz'

/**
 * User progress like quiz answers and current step
 */
export interface IProgress {
  /**
   * Quiz answers
   */
  quiz?: IQuiz

  /**
   * Current step
   */
  step: number
}
