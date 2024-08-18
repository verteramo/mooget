/*******************************************************************************
 * QuizResolver.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Package dependencies */
import { Question } from '../models/Question'

export abstract class QuizResolver {
  abstract resolve (questions: Question[]): void
}
