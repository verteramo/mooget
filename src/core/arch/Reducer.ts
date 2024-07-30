/*******************************************************************************
 * Reducer.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/**
 * Maps each property of an output type O to a
 * function that receives an input data of type I;
 * It is intended to reduce this data to an O object
 */
export type Reducer<I, O> = {
  [P in keyof O]?: (source: I) => O[P] | Promise<O[P]>
}

/**
 * Maps an array of types to a reducer
 *
 * @example
 * ```ts
 * const handler: TypeHandler<InputType, OutputType> = {
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
export interface TypeHandler<I, O> {
  /**
   * Types that this handler can reduce
   */
  types: string[]

  /**
   * Reducer map
   */
  reducer: Reducer<I, O>
}

/**
 * Reduce an input object to an OutputType object
 *
 * @param type Type of the question
 * @param handlers Handlers
 * @param source Source object
 * @returns Partial output type
 */
export async function reduce<I, O> (
  type: string,
  handlers: Array<TypeHandler<I, O>>,
  source: I
): Promise<Partial<O>> {
  const result: Partial<O> = {}

  // Find the reducer for the type
  const reducer = handlers.find(
    (handler) => handler.types.includes(type)
  )?.reducer

  // If there is a reducer, apply it on each property
  if (reducer !== undefined) {
    for (const property in reducer) {
      if (reducer[property] !== undefined) {
        result[property] = await reducer[property](source)
      }
    }
  }

  return result
}
