/**
 * Reducer.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

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
