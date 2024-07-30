/*******************************************************************************
 * Question.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Package dependencies */
import { Middleware } from '../arch/Middleware'
import { TypeHandler } from '../arch/Reducer'
import { IQuestion } from '../models/IQuestion'

export interface QuestionParser {
  /**
   * Identifier
   */
  id?: string

  /**
   * Question type like: multichoice, truefalse, etc.
   */
  type?: string

  /**
   * Question content
   */
  content?: string

  /**
   * Right answer if there is one
   */
  rightanswer?: string

  /**
   * Question feedback if there is one
   */
  feedback?: string

  /**
   * Correctness, if it can be determined
   */
  correct?: boolean
}

/**
 * Contract for external question data
 *
 * Parsers must extend this class and provide the implementation
 */
export abstract class QuestionParser {
  /**
   * @param $element HTML div.que element
   */
  constructor (
    readonly $element: JQuery<HTMLElement>
  ) {}
}

/**
 * It receives a Question and reduces it to an IQuestion
 */
export type QuestionHandler = TypeHandler<QuestionParser, IQuestion>

/**
 * It receives an IQuestion and apply some modifications on each property
 */
export type QuestionMiddleware = Middleware<IQuestion>

/**
 * Constructor for QuestionParser
 */
export type QuestionParserConstructor = new ($element: JQuery<HTMLElement>) => QuestionParser
