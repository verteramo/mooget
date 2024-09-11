/*******************************************************************************
 * Solution.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

export interface Solution {
  index: number
  questionAnswer: Array<string | boolean> | undefined
  userAnswer: Array<string | boolean>
}
