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
   * URL with the attempt parameter
   */
  url?: string

  /**
   * Site home
   */
  home?: string

  /**
   * Site icon
   */
  icon?: string

  /**
   * Site brand
   */
  brand?: string

  /**
   * Site version
   */
  version?: string
}
