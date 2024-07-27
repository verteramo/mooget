import { QuestionHandler, IQuestion, IAnswer } from '@/dom'

import $ from 'jquery'

/**
 * Matching question type:
 * have a content area and a list of names or statements which
 * must be correctly matched against another list of names or statements.
 * @see https://docs.moodle.org/en/Matching_question_type
 */
export const matchQHandler: QuestionHandler<IQuestion> = {
  types: ['match', 'randomsamatch'],
  reducer: {
    answer: (e, { correct }) => {
      const answer: IAnswer[] = []

      if (correct === true) {
        for (const option of e.find('table.answer > tbody > tr')) {
          const text = $(option).find('td.text').html()
          const control = $(option).find('td.control > select > option:selected').text()

          answer.push({ content: text, correct: control })
        }
      }

      return answer
    }
  }
}
