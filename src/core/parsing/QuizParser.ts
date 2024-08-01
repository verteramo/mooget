/*******************************************************************************
 * Quiz.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */

/** Package dependencies */
import { Question } from '../models/Question'
import { Quiz } from '../models/Quiz'
import { partial } from '../utils/native'
import { QuestionParserConstructor } from './QuestionParser'
import { QuestionReducerMap, reduce } from './QuestionReducer'

export interface QuizParser
  extends Partial<Omit<Quiz, 'id' | 'questions' | 'favorite'>> {}

export abstract class QuizParser {
  /**
   * Validity
   */
  abstract get valid (): boolean

  /**
   * Questions
   */
  abstract get questions (): NodeListOf<HTMLElement>

  /**
   * Reducers
   */
  abstract get reducers (): QuestionReducerMap

  abstract get hash (): (value: string) => string

  abstract get Parser (): QuestionParserConstructor

  async * genQuestions (): AsyncIterable<Question> {
    for (const element of this.questions) {
      const parser = new this.Parser(element)

      if (
        parser.type !== undefined &&
        parser.content !== undefined
      ) {
        yield {
          id: this.hash(parser.content),
          type: parser.type,
          content: parser.content,
          ...partial<Question>({
            feedback: parser.feedback,
            ...await reduce(parser.type, parser, this.reducers)
          })
        }
      }
    }
  }
}

/**
 * QuizParser constructor signature
 */
export type QuizParserConstructor = new () => QuizParser

/**
 * Create QuizParser instance
 * @param constructors QuizParser constructors
 */
function createQuizParserInstance (constructors: QuizParserConstructor[]): QuizParser | undefined {
  for (const Constructor of constructors) {
    const instance = new Constructor()

    if (
      instance.name !== undefined &&
      instance.category !== undefined
    ) {
      return instance
    }
  }
}

/**
 * Get quiz from the DOM
 */
export async function parseQuiz (constructors: QuizParserConstructor[]): Promise<Quiz | undefined> {
  const parser = createQuizParserInstance(constructors)

  if (
    parser?.name !== undefined &&
    parser?.category !== undefined
  ) {
    const questions: Question[] = []

    for await (const question of parser.genQuestions()) {
      questions.push(question)
    }

    if (questions.length > 0) {
      const { name, category } = parser

      return {
        id: parser.hash(name + category),
        name,
        category,
        questions,
        url: parser.url,
        icon: parser.icon,
        owner: parser.owner,
        version: parser.version
      }
    }
  }
}
