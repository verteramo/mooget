/*******************************************************************************
 * UserAnswer.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/**
 * User progress interface
 */
export interface UserAnswer {
  /**
   * Question index
   */
  index: number

  /**
   * Answer
   */
  answer?: Array<boolean | string>
}
