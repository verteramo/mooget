/*******************************************************************************
 * Reducer.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/**
 * Maps each property of an output type to a
 * function that receives the an input data,
 * and which is intended to reduce data to the output type
 */
export type Reducer<InputType, OutputType> = {
  [Property in keyof OutputType]?: (
    source: InputType
  ) => OutputType[Property] | Promise<OutputType[Property]>
}

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
