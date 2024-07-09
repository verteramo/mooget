/**
 * Multichoice question class
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { BaseQuestion, IAnswer } from '@/dom'
import $ from 'jquery'

/**
 * Multichoice question class
 */
export class MultichoiceQuestion extends BaseQuestion {
  /**
   * Get the question answer
   * @returns Question answer
   */
  get answer (): Promise<IAnswer[]> {
    return (async () => {
      const answer: IAnswer[] = []

      // Loop through options
      for (const option of this.element.find('div.answer > div')) {
        // Check if the option is checked
        const checked = $(option).find('input').attr('checked') === 'checked'

        const content = $(option).find('div > div, label').html()

        // Check if the answer is correct
        // If the question is correct, if it's checked, it's correct
        // Otherwise, if it's in the right answer, it's correct
        const correct =
          this.correct === true ? checked : this.rightanswer?.includes(content)

        // Push the answer with its correctness
        answer.push({ content, correct })
      }

      return answer
    })()
  }
}
