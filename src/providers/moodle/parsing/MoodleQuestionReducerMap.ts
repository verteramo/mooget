/*******************************************************************************
 * MoodleQuestionReducerMap.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import $ from 'jquery'

// Project dependencies
import { Answer } from '@/models'
import { QuestionReducer } from '@/parsing'

export const MoodleQuestionReducerMap: QuestionReducer = {
  /**
   * Drag and drop into text question type:
   * Missing words have to be dragged into gaps in a paragraph of text.
   * @see https://docs.moodle.org/en/Drag_and_drop_into_text_question_type
   */
  draganddrop: {
    content: ({ element }) => {
      const qtext = $(element).find('div.qtext').clone()

      for (const drop of qtext.find('span.drop')) {
        const place = $(drop).attr('class')?.split(' ').filter((c) => c.startsWith('place'))[0]

        if (place !== undefined) {
          $(drop).replaceWith(`{{${place}}}`)
        }
      }

      for (const drag of qtext.find('span.draghome')) {
        $(drag).remove()
      }

      return qtext.html().replace(/\s+/g, ' ').trim()
    },

    answers: ({ element, correct }) => {
      const answers: Answer[] = []

      if (correct === true) {
        const qtext = $(element).find('div.qtext').clone()

        for (const drop of qtext.find('span.drop, span.draghome')) {
          if ($(drop).is('span.drop')) {
            const place = $(drop).attr('class')?.split(' ').filter((c) => c.startsWith('place'))[0]

            if (place !== undefined) {
              answers.push({ value: place })
            }
          } else if ($(drop).is('span.draghome')) {
            answers[answers.length - 1] = {
              ...answers[answers.length - 1],
              match: $(drop).html()
            }
          }
        }
      }

      return answers
    },

    type: () => 'matching'
  },

  /**
   * Matching question type:
   * have a content area and a list of names or statements which
   * must be correctly matched against another list of names or statements.
   * @see https://docs.moodle.org/en/Matching_question_type
   */
  matching: {
    answers: ({ element, correct }) => {
      const answers: Answer[] = []

      if (correct === true) {
        for (const option of $(element).find('table.answer > tbody > tr')) {
          const value = $(option).find('td.text').html()
          const match = $(option).find('td.control > select > option[selected]').html()

          if (value != null && match != null) {
            answers.push({ value, match })
          }
        }
      }

      return answers
    }
  },

  /**
   * Multianswer question type
   */
  multianswer: {
    answers: ({ element, correct }) => {
      const answers: Answer[] = []

      if (correct === true) {
        const formulation = $(element).find('div.formulation > p')

        // Loop through the text content nodes
        let answerContent: string[] = []
        for (const content of formulation.children()) {
          // All content that is not a span.subquestion is content
          if (!$(content).is('span.subquestion')) {
            answerContent.push($(content).prop('outerHTML') ?? $(content).text())
          } else {
            answers.push({ value: answerContent.join('') })
            answerContent = []
          }
        }

        // Loop through inputs and selects and save the
        // correct answer in its corresponding index
        // formulation?.querySelectorAll('span.subquestion input,select').forEach(function (index) {
        //   switch ($(this).prop('tagName').toLowerCase()) {
        //     case 'input':{
        //       answer[index].correct = $(this).val()?.toString()
        //       break
        //     }

        //     case 'select':{
        //       answer[index].correct = $(this).find('option:selected').text()
        //       // answer[index].options = $(this).find(
        //       //   'option:not(:selected):not([value=""])'
        //       // ).map(function () {
        //       //   return $(this).html()
        //       // }).get()
        //       break
        //     }
        //   }
        // })
      }

      return answers
    }
  },

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
  multichoice: {
    answers: async ({ element, correct, rightanswer }) => {
      const answers: Answer[] = []

      // Loop through options
      for (const option of $(element).find('div.answer > div')) {
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
        const match = correct === true
          ? checked
        // Here check if the right answer includes the text (not html content)
          : rightanswer?.includes(text) ?? false

        const feedback = $(option).find('div.specificfeedback')

        // Push the answer with its correctness and feedback if it exists
        if (feedback.length > 0) {
          answers.push({ value, match, feedback: feedback.html() })
        } else {
          answers.push({ value, match })
        }
      }

      // If some answer is correct, put to false the undefined ones
      if (answers.some(({ match }) => match === true)) {
        return answers.map(({ value, match, feedback }) => {
          return {
            value,
            match: match ?? false,
            feedback
          }
        })
      }

      return answers
    }
  },

  /**
   * Short-Answer question type:
   * The student types in a word or phrase in .esponse to a question (that may include an image)
   * Answers may or may not be case sensitive.
   * The answer could be a word or a phrase, but it must match one of your acceptable answers exactly.
   * @see https://docs.moodle.org/en/Short-Answer_question_type
   *
   * Numerical question type:
   * Looks just like a short-answer question.
   * @see https://docs.moodle.org/en/Numerical_question_type
   *
   * Calculated question type:
   * The main purpose of the calculated question is to create multiple versions with different numerical values.
   * Could be replaced by the numerical question type instead.
   * @see https://docs.moodle.org/en/Calculated_question_type
   *
   * Essay question type:
   * Provides the option of answering by uploading one or more files and/or entering text online.
   * @see https://docs.moodle.org/en/Essay_question_type
   */
  text: {
    answers: ({ element, rightanswer }) => {
      return [{
        value: (
          rightanswer ??
          $(element).find('input[type=text]').val()?.toString() ??
          $(element).find('textarea').val()?.toString() ?? ''
        )
      }]
    }
  },

  /**
   * True/False question type:
   * A student is given only two choices for an answer in this kind of question: True or False.
   * The question content can include an image or html code.
   * @see https://docs.moodle.org/en/True/False_question_type
   */
  truefalse: {
    answers: ({ element, correct }) => {
      return [{
        value: (
          correct === true &&
          $(element)
            .find('input[type=radio]')
            .attr('checked') === 'checked'
        )
      }]
    }
  }
}
