import { QuestionHandler, IQuestion } from '@/dom'

/**
 * True/False question type:
 * A student is given only two choices for an answer in this kind of question: True or False.
 * The question content can include an image or html code.
 * @see https://docs.moodle.org/en/True/False_question_type
 */
export const truefalseQHandler: QuestionHandler<IQuestion> = {
  types: ['truefalse'],
  reducer: {
    answer: (e, { correct }): boolean => {
      const checked = e.find('input[type=radio]').attr('checked') === 'checked'
      return correct === true ? checked : !checked
    }
  }
}
