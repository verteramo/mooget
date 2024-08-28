/*******************************************************************************
 * UserAnswer.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/**
 * User answer interface
 */
export interface UserAnswer {
  /**
   * Answer type
   */
  type: string

  /**
   * Question index
   */
  index: number

  /**
   * Answer
   */
  value?: Array<boolean | string | undefined>
}
