/**
 * reduce.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { Handler } from '@/core/utils/Handler'

/**
 * Reduce an input object to an output type
 *
 * @param type Type
 * @param handlers Handlers
 * @param source Source object
 * @returns Partial output type
 */
export async function reduce<InputType, OutputType> (
  type: string,
  handlers: Array<Handler<InputType, OutputType>>,
  source: InputType
): Promise<Partial<OutputType>> {
  const result: Partial<OutputType> = {}

  // Find the reducer for the question type
  const reducer = handlers.find(
    (handler) => handler.types.includes(type)
  )?.reducer

  // If there is a reducer, reduce the question
  if (reducer !== undefined) {
    for (const property in reducer) {
      if (reducer[property] !== undefined) {
        result[property] = await reducer[property](source)
      }
    }
  }

  return result
}
