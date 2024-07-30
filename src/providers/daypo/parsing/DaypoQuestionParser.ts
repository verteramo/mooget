/*******************************************************************************
 * DaypoQuestionParser.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

import { QuestionParser } from '@/core/parsing/Question'

export class DaypoQuestionParser extends QuestionParser {
  get type (): string | undefined {
    return 'daypo-question-type'
  }

  get content (): string | undefined {
    console.log('content')
    console.log(this.$element)
    const text = this.$element.find('td#pri1').html()

    if (text.length > 0) {
      return text
    }

    return 'hola'
  }
}
