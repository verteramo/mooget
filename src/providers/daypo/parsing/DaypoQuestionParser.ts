/*******************************************************************************
 * DaypoQuestionParser.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Project dependencies
import { QuestionType } from '@/models'
import { QuestionParser } from '@/parsing'

export class DaypoQuestionParser extends QuestionParser {
  get type (): QuestionType | undefined {
    throw new Error('Method not implemented.')
  }

  get content (): string | undefined {
    throw new Error('Method not implemented.')
  }
}
