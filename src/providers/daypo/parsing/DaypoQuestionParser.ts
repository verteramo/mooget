/*******************************************************************************
 * DaypoQuestionParser.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Project dependencies
import { AnswerType } from '@/models'
import { QuestionParser } from '@/parsing'

export class DaypoQuestionParser extends QuestionParser {
  get type (): AnswerType | undefined {
    throw new Error('Method not implemented.')
  }

  get content (): string | undefined {
    throw new Error('Method not implemented.')
  }
}
