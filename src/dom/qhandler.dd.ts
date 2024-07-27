import { QuestionHandler, IQuestion, IAnswer } from '@/dom'

import $ from 'jquery'

/**
 * Drag and drop into text question type:
 * Missing words have to be dragged into gaps in a paragraph of text.
 * @see https://docs.moodle.org/en/Drag_and_drop_into_text_question_type
 */
export const ddQHandler: QuestionHandler<IQuestion> = {
  types: ['ddwtos'],
  reducer: {
    content: undefined,
    answer: (e, { correct }) => {
      const answer: IAnswer[] = []

      // If the question is correct
      if (correct === true) {
        const qtext = e.find('div.qtext')

        // let answerContent: string[] = []
        // // Loop through the text content nodes
        // for (const content of qtext.contents()) {
        //   if (!$(content).is('span[class*=drop], span.draghome')) {
        //     const outerHTML = $(content).prop('outerHTML')
        //     if (outerHTML !== undefined && outerHTML !== '') {
        //       answerContent.push(outerHTML)
        //     } else {
        //       answerContent.push($(content).text())
        //     }
        //     // answerContent.push($(content).prop('outerHTML') ?? $(content).text())
        //   } else {
        //     answer.push({ content: answerContent.join('') })
        //     answerContent = []
        //   }
        // }

        // console.log(answer)

        // Loop through the text and save text nodes
        qtext.contents().each(function () {
          if (this.nodeType === this.TEXT_NODE) {
            answer.push({ content: $(this).text() })
          }
        })

        // Loop through draghome spans and save the
        // correct answer in its corresponding index
        qtext.find('span.draghome').each(function (index) {
          answer[index].correct = $(this).text()
        })
      }

      return answer
    }
  }
}
