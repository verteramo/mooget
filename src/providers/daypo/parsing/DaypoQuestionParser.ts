/*******************************************************************************
 * DaypoQuestionParser.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

import { QuestionType } from '@/core/models'
import { QuestionParser } from '@/core/parsing'

export class DaypoQuestionParser extends QuestionParser {
  get type (): QuestionType | undefined {
    throw new Error('Method not implemented.')
  }

  get content (): string | undefined {
    throw new Error('Method not implemented.')
  }
}
