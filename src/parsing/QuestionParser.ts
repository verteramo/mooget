/*******************************************************************************
 * QuestionParser.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Package dependencies
import { QuestionReducer, reduce } from './QuestionReducer'

// Project dependencies
import { Question, QuestionType } from '@/models'
import { partial } from '@/utils/native'

/**
 * Question parser optional properties
 */
export interface QuestionParser {
  /**
   * Correctness, if it can be determined
   */
  correct?: boolean

  /**
   * Right answer, if any
   */
  rightanswer?: string

  /**
   * Feedback, if any
   */
  feedback?: string
}

/**
 * Contract for external question data
 */
export abstract class QuestionParser {
  /**
   * Type
   */
  abstract get type (): QuestionType | undefined

  /**
   * Content
   */
  abstract get content (): string | undefined

  /**
   * @param element Question root element
   */
  constructor (readonly element: HTMLElement) {}

  /**
   * Get the question as a model
   *
   * @param hash Hashing function
   * @param reducer Question reducer
   */
  async getQuestion (hash: (value: string) => string, reducer: QuestionReducer): Promise<Question | undefined> {
    const type = this.type
    const content = this.content

    if (
      type !== undefined &&
      content !== undefined
    ) {
      return {
        id: hash(content),
        type,
        content,
        answers: [],
        ...await reduce(type, this, reducer),
        ...partial<Question>({
          feedback: this.feedback
        })
      }
    }
  }
}
