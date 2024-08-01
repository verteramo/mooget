/*******************************************************************************
 * IProgress.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Package dependencies */
import { Quiz } from './Quiz'

/**
 * User progress interface
 */
export interface Progress {
  /**
   * Quiz answers
   */
  quiz?: Quiz

  /**
   * Current step
   */
  step: number
}
