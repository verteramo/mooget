/*******************************************************************************
 * Provider.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Package dependencies */
import { Constructor } from './Constructor'
import { QuestionParser } from './QuestionParser'
import { QuestionReducer } from './QuestionReducer'
import { QuizParser } from './QuizParser'
import { QuizResolver } from './QuizResolver'

/**
 * Represents the class kit for instantiating the parsing elements for a provider
 */
export interface Provider {
  QuizParser: Constructor<typeof QuizParser>
  QuestionParser: Constructor<typeof QuestionParser>
  QuizResolver: Constructor<typeof QuizResolver>
  reducers: QuestionReducer
}
