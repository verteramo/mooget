import { QuestionHandler, IQuestion, IAnswer } from '@/dom'

import $ from 'jquery'

export const manswerQHandler: QuestionHandler<IQuestion> = {
  types: ['multianswer'],
  reducer: {
    answer: (e, { correct }) => {
      const answer: IAnswer[] = []

      // If the question is correct
      if (correct === true) {
        const formulation = e.find('div.formulation > p')

        // Loop through the text content nodes
        let answerContent: string[] = []
        for (const content of formulation.contents()) {
          // All content that is not a span.subquestion is content
          if (!$(content).is('span.subquestion')) {
            answerContent.push($(content).prop('outerHTML') ?? $(content).text())
          } else {
            answer.push({ content: answerContent.join('') })
            answerContent = []
          }
        }

        // Loop through inputs and selects and save the
        // correct answer in its corresponding index
        formulation.find('span.subquestion input,select').each(function (index) {
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
