/*******************************************************************************
 * QuizParser.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Package dependencies
import { Constructor } from './Constructor'
import { Provider } from './Provider'
import { QuestionParser } from './QuestionParser'
import { QuestionReducer } from './QuestionReducer'

// Project dependencies
import { Question, Quiz } from '@/models'

/**
 * Quiz parser optional properties
 */
export interface QuizParser {
  /**
   * URL
   */
  url?: string

  /**
   * Icon URL
   */
  icon?: string

  /**
   * Owner, site, author...
   */
  owner?: string

  /**
   * Version
   */
  version?: string | Promise<string | undefined> | undefined
}

/**
 * Contract for external quiz data
 */
export abstract class QuizParser {
  /**
   * Check if the current page can be handled
   */
  abstract get canHandleDocument (): boolean

  /**
   * Name
   */
  abstract get name (): string | undefined

  /**
   * Category
   */
  abstract get category (): string | undefined

  /**
   * Questions
   */
  abstract get questions (): NodeListOf<HTMLElement>

  /**
   * Hash function for generating unique IDs
   */
  abstract get hash (): (value: string) => string

  /**
   * Generations of questions
   *
   * @param Parser QuestionParser constructor
   * @param reducer QuestionReducer
   */
  async * genQuestions (Parser: Constructor<typeof QuestionParser>, reducer: QuestionReducer): AsyncIterable<Question> {
    for (const element of this.questions) {
      const parser = new Parser(element)
      const question = await parser.getQuestion(this.hash, reducer)

      if (question !== undefined) {
        yield question
      }
    }
  }
}

/**
 * Create QuizParser instance
 * @param constructors QuizParser constructors
 */
export async function parse (providers: Provider[]): Promise<Quiz | undefined> {
  for (const { QuizParser, QuestionParser, reducers } of providers) {
    const parser = new QuizParser()
    const { name, category } = parser

    if (
      parser.canHandleDocument &&
      name !== undefined &&
      category !== undefined
    ) {
      const questions: Question[] = []

      for await (const question of parser.genQuestions(QuestionParser, reducers)) {
        questions.push(question)
      }

      if (questions.length > 0) {
        return {
          id: parser.hash(name + category),
          name,
          category,
          questions,
          url: parser.url,
          icon: parser.icon,
          owner: parser.owner,
          version: await parser.version
        }
      }
    }
  }
}
