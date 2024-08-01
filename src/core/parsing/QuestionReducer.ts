/*******************************************************************************
 * QuestionReducer.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Package dependencies */
import { Question } from '../models/Question'
import { QuestionType } from '../models/QuestionType'
import { QuestionParser } from './QuestionParser'

/**
 * Reducer contract
 *
 * @example Reducers will look like:
 * ```typescript
 * const reducers: ReducerMap<MyEnumType, SourceType, TargetType> = {
 *   [MyEnumType.MyEnumValue]: {
 *     target_property: (source: SourceType) => {
 *       // do something with source
 *       // and return some data as target_property type
 *     }
 *   },
 *   ...
 * ```
 */
type ReducerMap<Enum extends string | number, Source, Target> = {
  [Member in Enum]?: {
    [Property in keyof Target]?: (
      source: Source
    ) => Target[Property] | Promise<Target[Property]>
  }
}

/**
 * Reduce source to target
 */
export async function reduce<Enum extends string | number, Source, Target> (
  member: Enum,
  source: Source,
  map: ReducerMap<Enum, Source, Target>
): Promise<Partial<Target>> {
  const target: Partial<Target> = {}

  if (map[member] !== undefined) {
    for (const key in map[member]) {
      const property = key as keyof Target
      const reducer = map[member][property]
      if (reducer !== undefined) {
        target[property] = await reducer(source)
      }
    }
  }

  return target
}

/**
 * Question reducer
 */
export type QuestionReducerMap = ReducerMap<QuestionType, QuestionParser, Question>
