import { QuestionHandler, IQuestion, IAnswer } from '@/dom'

import $ from 'jquery'

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
export const mchoiceQHandler: QuestionHandler<IQuestion> = {
  types: ['multichoice', 'calculatedmulti'],
  reducer: {
    answer: async (e, { correct, rightanswer }) => {
      const answer: IAnswer[] = []

      // Loop through options
      for (const option of e.find('div.answer > div')) {
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
        const isCorrect = correct === true
          ? checked
        // Here check if the right answer includes the text (not html content)
          : rightanswer?.includes(text) ?? false

        const feedback = $(option).find('div.specificfeedback')

        // Push the answer with its correctness and feedback if it exists
        if (feedback.length > 0) {
          answer.push({ content, correct: isCorrect, feedback: feedback.html() })
        } else {
          answer.push({ content, correct: isCorrect })
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
    }
  }
}
