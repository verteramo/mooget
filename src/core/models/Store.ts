/*******************************************************************************
 * IStore.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Package dependencies */
import { Config } from './Config'
import { Quiz } from './Quiz'
import { Progress } from './Progress'

/**
 * Store interface
 */
export interface Store {
  /**
   * Configuration
   */
  config: Config

  /**
   * Quizzes
   */
  quizzes: Quiz[]

  /**
   * User progress
   */
  progress: Progress
}
