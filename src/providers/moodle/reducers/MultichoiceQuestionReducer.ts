/*******************************************************************************
 * qhMultichoice.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import $ from 'jquery'

/** Project dependencies */
import { Answer } from '@/core/models/Answer'
import { QuestionType } from '@/core/models/QuestionType'
import { QuestionReducerMap } from '@/core/parsing/QuestionReducer'

/**
 * Single-answer questions:
 * Allow one and only one answer to be chosen by providing radio buttons next to the answers.
 * Multiple-answer questions:
 * Allow one or more answers to be chosen by providing check boxes next to the answers.
 * @see https://docs.moodle.org/en/Multiple_Choice_question_type
 *
 * Calculated multichoice questions:
 * Are like multichoice questions.
 * @see https://docs.moodle.org/en/Calculated_multichoice_question_type
 */
export const MultichoiceQuestionReducer: QuestionReducerMap = {
  [QuestionType.Multichoice]: {
    answer: async ({ element, correct, rightanswer }) => {
      const answer: Answer[] = []

      // Loop through options
      for (const option of element.querySelectorAll('div.answer > div')) {
      // Check if the option is checked
        const checked = $(option).find('input').attr('checked') === 'checked'

        let text: string
        let value: string

        // Version 4.1.3
        const contentElement = $(option).find('div > div')

        if (contentElement.length > 0) {
          text = contentElement.text().trim()
          value = contentElement.html().trim()
        } else {
          // Version 3.7.7
          const label = $(option).find('label').clone()

          // Remove the answernumber span and get the remaining HTML content
          label.find('span.answernumber').remove()
          text = label.text().trim()
          value = label.html().trim()
        }

        // Check if the answer is correct
        // If the question is correct, if it is checked, it is correct
        // Otherwise, if it is in the right answer, it is correct
        const isCorrect = correct === true
          ? checked
        // Here check if the right answer includes the text (not html content)
          : rightanswer?.includes(text) ?? false

        const feedback = $(option).find('div.specificfeedback')

        // Push the answer with its correctness and feedback if it exists
        if (feedback.length > 0) {
          answer.push({ value, correct: isCorrect, feedback: feedback.html() })
        } else {
          answer.push({ value, correct: isCorrect })
        }
      }

      // If some answer is correct, put to false the undefined ones
      if (answer.some(({ correct }) => correct === true)) {
        return answer.map(({ value, correct, feedback }) => {
          return {
            value,
            correct: correct ?? false,
            feedback
          }
        })
      }

      return answer
    }
  }
}
