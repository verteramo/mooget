/*******************************************************************************
 * Question.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Package dependencies */
import { IQuestion } from '../models/IQuestion'
import { Middleware } from '../arch/Middleware'
import { Handler } from '../arch/Reducer'

/**
 * Contract for external question data
 *
 * Parsers must extend this class and provide the implementation
 */
export abstract class Question {
  /**
   * JQuery div.que element
   */
  readonly $element: JQuery<HTMLElement>

  /**
   * @param $element JQuery div.que element
   */
  constructor ($element: JQuery<HTMLElement>) {
    this.$element = $element
  }

  /**
   * Question type like: multichoice, truefalse, etc.
   */
  abstract get type (): string | undefined

  /**
   * Question content
   */
  abstract get content (): string | undefined

  /**
   * Right answer if there is one
   */
  abstract get rightanswer (): string | undefined

  /**
   * Question feedback if there is one
   */
  abstract get feedback (): string | undefined

  /**
   * Correctness, if it can be determined
   */
  abstract get correct (): boolean | undefined
}

/**
 * It receives a Question and reduces it to an IQuestion
 */
export type QuestionHandler = Handler<Question, IQuestion>

/**
 * It receives an IQuestion and apply some modifications on each property
 */
export type QuestionMiddleware = Middleware<IQuestion>
