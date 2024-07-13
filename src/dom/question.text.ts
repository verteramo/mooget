/**
 * Text question class
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { BaseQuestion } from '@/dom'

/**
 * Text question class
 */
export class TextQuestion extends BaseQuestion {
  /**
   * Get the question answer
   * @returns Question answer
   */
  get answer (): string {
    return (
      this.rightanswer ??
      this.element.find('input[type=text]').val()?.toString() ??
      this.element.find('div.answer > div[role=textbox]').html()
    )
  }
}
