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

        let text: string
        let content: string

        // Version 4.1.3
        const contentElement = $(option).find('div > div')

        if (contentElement.length > 0) {
          text = contentElement.text().trim()
          content = contentElement.html().trim()
        } else {
          // Version 3.7.7
          const label = $(option).find('label').clone()

          // Remove the answernumber span and get the remaining HTML content
          label.find('span.answernumber').remove()
          text = label.text().trim()
          content = label.html().trim()
        }

        // Check if the answer is correct
        // If the question is correct, if it is checked, it is correct
        // Otherwise, if it is in the right answer, it is correct
        const correct = this.correct === true
          ? checked
          // Here check if the right answer includes the text (not html content)
          : this.rightanswer?.includes(text)

        const feedback = $(option).find('div.specificfeedback')

        // Push the answer with its correctness and feedback if it exists
        if (feedback.length > 0) {
          answer.push({ content, correct, feedback: feedback.html() })
        } else {
          answer.push({ content, correct })
        }
      }

      // If some answer is correct, put to false the undefined ones
      if (answer.some(({ correct }) => correct === true)) {
        return answer.map(({ content, correct, feedback }) => {
          return {
            content,
            correct: correct ?? false,
            feedback
          }
        })
      }

      return answer
    })()
  }
}
