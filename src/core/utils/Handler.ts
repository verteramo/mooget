/**
 * Handler.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { Reducer } from '@/core/utils/Reducer'

/**
 * Maps array of types to a reducer
 *
 * @example
 * ```ts
 * const handler: Handler<InputType, OutputType> = {
 *   types: ['type1', 'type2', ...],
 *   reducer: {
 *     some_property: ({...}: InputType): OutputType => {
 *       // Do something with the input object
 *     },
 *     ...
 *   }
 * }
 * ```
 */
export interface Handler<InputType, OutputType> {
  /**
   * Types that this handler can reduce
   */
  types: string[]
  /**
   * Reducer
   */
  reducer: Reducer<InputType, OutputType>
}
