/*******************************************************************************
 * IQuiz.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Package dependencies */
import { IQuestion } from './IQuestion'

/**
 * Quiz interface
 *
 * It is the quiz data
 */
export interface IQuiz {
  /**
   * MD5 hash of the quiz name
   */
  id: string

  /**
   * Name
   */
  name: string

  /**
   * Category
   */
  category: string

  /**
   * Questions
   */
  questions: IQuestion[]

  /**
   * Favorite status
   */
  favorite?: boolean

  /**
   * Body ID
   */
  type?: string

  /**
   * Quiz URL
   */
  url?: string

  /**
   * Site home URL
   */
  home?: string

  /**
   * Representative icon
   */
  icon?: string

  /**
   * Owner, site, author...
   */
  owner?: string

  /**
   * Site version
   */
  version?: string
}
