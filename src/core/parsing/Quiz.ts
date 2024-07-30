/*******************************************************************************
 * Quiz.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import $ from 'jquery'

/** Package dependencies */
import { applyMiddlewares } from '../arch/Middleware'
import { reduce } from '../arch/Reducer'
import { IQuestion } from '../models/IQuestion'
import { partial } from '../utils/native'
import {
  QuestionHandler,
  QuestionMiddleware,
  QuestionParserConstructor
} from './Question'

export interface QuizProvider {
  type?: string
  name?: string
  category?: string
  url?: string
  home?: string
  icon?: string
  owner?: string
  version?: string | Promise<string | undefined>
  questions?: JQuery<HTMLElement>
  handlers?: QuestionHandler[]
  middlewares?: QuestionMiddleware[]
}

export abstract class QuizProvider {
  abstract get hash (): (value: string) => string

  async * genQuestions (Constructor: QuestionParserConstructor): AsyncIterable<IQuestion> {
    if (this.questions !== undefined) {
      for (const element of this.questions) {
        const question = new Constructor($(element))
        const type = question.type
        const content = question.content

        if (
          type !== undefined &&
          content !== undefined
        ) {
          yield applyMiddlewares({
            id: content,
            type,
            content,
            ...partial<IQuestion>({
              feedback: question.feedback,
              ...await reduce(type, this.handlers ?? [], question)
            })
          }, this.middlewares ?? [])
        }
      }
    }
  }
}

export type QuizProviderConstructor = new () => QuizProvider

export type QuizConstructorTuple = [QuizProviderConstructor, QuestionParserConstructor]
