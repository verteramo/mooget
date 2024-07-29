/*******************************************************************************
 * IStore.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Package dependencies */
import { IConfig } from './IConfig'
import { IProgress } from './IProgress'
import { IQuiz } from './IQuiz'

/**
 * Store interface
 */
export interface IStore {
  /**
   * Store configuration
   */
  config: IConfig

  /**
   * Store quizzes
   */
  quizzes: IQuiz[]

  /**
   * Store progress
   */
  progress: IProgress
}
