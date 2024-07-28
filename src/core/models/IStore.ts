/**
 * IStore.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { IConfig } from '@/core/models/IConfig'
import { IProgress } from '@/core/models/IProgress'
import { IQuiz } from '@/core/models/IQuiz'

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
