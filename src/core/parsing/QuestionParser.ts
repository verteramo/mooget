/*******************************************************************************
 * Question.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Package dependencies */
import { Question } from '../models/Question'

/**
 * Contract for external question data
 */
export interface QuestionParser
  extends Partial<Omit<Question, 'id'>> {

  /**
   * Right answer, if any
   */
  rightanswer?: string

  /**
   * Correctness, if it can be determined
   */
  correct?: boolean
}

export abstract class QuestionParser {
  /**
   * @param element Question root element
   */
  constructor (
    readonly element: HTMLElement
  ) {}
}

/**
 * Question parser constructor
 */
export type QuestionParserConstructor =
  new (element: HTMLElement) => QuestionParser
