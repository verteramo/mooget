/*******************************************************************************
 * UserAnswer.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/**
 * User answer interface
 */
export interface UserAnswer {
  /**
   * Question index
   */
  index: number

  /**
   * Answer
   */
  value: Array<boolean | string | undefined>
}
