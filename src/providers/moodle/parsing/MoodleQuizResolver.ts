/*******************************************************************************
 * MoodleQuizResolver.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { Question } from '@/models'
import { QuizResolver } from '@/parsing'

export class MoodleQuizResolver extends QuizResolver {
  resolve (questions: Question[]): void {
    for (const element of document.querySelectorAll('div.que')) {
      element.remove()
    }
  }
}
