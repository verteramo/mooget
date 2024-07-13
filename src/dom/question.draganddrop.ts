import { BaseQuestion, IAnswer } from '@/dom'

import $ from 'jquery'

export class DragAndDropQuestion extends BaseQuestion {
  get answer (): IAnswer[] {
    const answer: IAnswer[] = []

    // If the question is correct
    if (this.correct === true) {
      const qtext = this.element.find('div.qtext')

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
