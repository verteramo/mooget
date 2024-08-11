/*******************************************************************************
 * qhMultianswer.ts
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

export const MultianswerQuestionReducer: QuestionReducerMap = {
  [QuestionType.Multianswer]: {
    answer: ({ element, correct }) => {
      const answer: Answer[] = []

      // If the question is correct
      if (correct === true) {
        const formulation = element.querySelector('div.formulation > p')

        // Loop through the text content nodes
        let answerContent: string[] = []
        for (const content of formulation?.childNodes ?? []) {
          // All content that is not a span.subquestion is content
          if (!$(content).is('span.subquestion')) {
            answerContent.push($(content).prop('outerHTML') ?? $(content).text())
          } else {
            answer.push({ value: answerContent.join('') })
            answerContent = []
          }
        }

        // Loop through inputs and selects and save the
        // correct answer in its corresponding index
        formulation?.querySelectorAll('span.subquestion input,select').forEach(function (index) {
          switch ($(this).prop('tagName').toLowerCase()) {
            case 'input':{
              answer[index].correct = $(this).val()?.toString()
              break
            }

            case 'select':{
              answer[index].correct = $(this).find('option:selected').text()
              // answer[index].options = $(this).find(
              //   'option:not(:selected):not([value=""])'
              // ).map(function () {
              //   return $(this).html()
              // }).get()
              break
            }
          }
        })
      }

      return answer
    }
  }
}
