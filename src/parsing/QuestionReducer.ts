/*******************************************************************************
 * QuestionReducer.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Package dependencies
import { QuestionParser } from './QuestionParser'

// Project dependencies
import { Question, QuestionType } from '@/models'

/**
 * Reducer contract
 *
 * @example Reducers will look like:
 * ```typescript
 * const reducer: Reducer<MyEnumType, SourceType, TargetType> = {
 *   [MyEnumType.MyEnumValue]: {
 *     property: (source: SourceType): TargetType['property'] => {
 *       // do something with source
 *       // and return some data as property type
 *     }
 *   },
 *   ...
 * ```
 */
type Reducer<Enum extends string | number, Source, Target> = {
  [Member in Enum]?: {
    [Property in keyof Target]?: (
      source: Source
    ) => Target[Property] | Promise<Target[Property]>
  }
}

/**
 * Reduce source to target properties
 */
export async function reduce<Enum extends string | number, Source, Target> (
  member: Enum,
  source: Source,
  reducer: Reducer<Enum, Source, Target>
): Promise<Partial<Target>> {
  const target: Partial<Target> = {}

  if (reducer[member] !== undefined) {
    for (const key in reducer[member]) {
      const property = key as keyof Target
      const propertyReducer = reducer[member][property]
      if (propertyReducer !== undefined) {
        target[property] = await propertyReducer(source)
      }
    }
  }

  return target
}

/**
 * Question reducer
 */
export type QuestionReducer = Reducer<QuestionType, QuestionParser, Question>
