/*******************************************************************************
 * QuizResolver.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Project dependencies
import { Question } from '@/models';

export abstract class QuizResolver {
  abstract resolve (questions: Question[]): void
}
