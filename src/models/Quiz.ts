/*******************************************************************************
 * Quiz.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Package dependencies
import { Question } from '.'

/**
 * Quiz interface
 */
export interface Quiz {
  /**
   * ID
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
  questions: Question[]

  /**
   * The quiz is sequential
   */
  sequential?: boolean

  /**
   * URL
   */
  url?: string

  /**
   * Icon URL
   */
  icon?: string

  /**
   * Owner, site, author...
   */
  owner?: string

  /**
   * Version
   */
  version?: string

  /**
   * Favorite status
   */
  favorite?: boolean
}
