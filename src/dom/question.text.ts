/**
 * Text question class
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { IAnswer, BaseQuestion } from '@/dom'

/**
 * Text question class
 */
export class TextQuestion extends BaseQuestion {
  /**
   * Get the question answer
   * @returns Question answer
   */
  get answer (): IAnswer[] {
    const answer: IAnswer[] = []

    // If it has a right answer, push it
    if (this.rightanswer !== undefined) {
      answer.push({
        content: this.rightanswer
      })
    } else {
      console.log(this.content)
      // If it has an input or a textbox, push it
      if (this.element.find('span.answer > input')?.length > 0) {
        answer.push({
          content: this.element.find('span.answer > input').val() as string
        })
      } else if (this.element.find('div.answer > div[role=textbox]').length > 0) {
        answer.push({
          content: this.element.find('div.answer > div[role=textbox]').html()
        })
      }
    }

    return answer
  }
}
