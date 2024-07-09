/**
 * Match question class
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { IAnswer, BaseQuestion } from '@/dom'
import $ from 'jquery'

/**
 * TODO
 * Match question class
 */
export class MatchQuestion extends BaseQuestion {
  /**
   * Get the question answer
   * @returns Question answer
   */
  get answer (): IAnswer[] {
    const answer: IAnswer[] = []
    if (this.correct === true) {
      for (const option of this.element.find('table.answer > tbody > tr')) {
        const text = $(option).find('td.text').html()
        const control = $(option).find('td.control > select > option:selected').text()

        answer.push({
          content: text,
          correct: control
        })
      }
    } else {
      const optionsSelector = 'table.answer > tbody > tr:first-child > td.control > select > option:not(:first-child)'
      const options = this.element.find(optionsSelector).map((_, option) => $(option).html()).get()

      console.log('options:', options)

      const texts = this.element.find('table.answer > tbody > tr > td.text').map((_, text) => $(text).html()).get()

      console.log('texts:', texts)

      return []
    }

    return answer
  }
}
