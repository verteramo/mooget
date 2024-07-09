/**
 * Question class
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

export enum QuestionType {
  Description,
  Text,
  Match,
  Multichoice,
}

export interface IAnswer {
  content: string
  correct?: boolean | string | undefined
}

export interface IQuestion {
  id: string
  type: QuestionType | undefined
  content: string
  answer?: IAnswer[]
}

/**
 * Question
 */
export class BaseQuestion {
  /**
   * Question HTML element
   */
  protected readonly element: JQuery<HTMLElement>

  /**
   * Construct the question from the element
   * @param element Question element
   */
  constructor (element: JQuery<HTMLElement>) {
    this.element = element
  }

  /**
   * Question type
   *
   * It is the second class of the question element
   * @returns Question type
   */
  get type (): QuestionType | undefined {
    const type = this.element.attr('class')?.split(/\s+/)[1]

    if (type !== undefined) {
      switch (type) {
        case 'description':
          return QuestionType.Description

        case 'shortanswer':
        case 'numerical':
        case 'calculated':
        case 'essay':
          return QuestionType.Text

        case 'match':
        case 'randomsamatch':
          return QuestionType.Match

        case 'multichoice':
        case 'calculatedmulti':
        case 'truefalse':
          return QuestionType.Multichoice
      }
    }
  }

  /**
   * HTML content
   * @returns Question content
   */
  get content (): string {
    return this.element.find('div.qtext').html()
  }

  /**
   * Right answer
   *
   * @returns Right answer or undefined
   */
  get rightanswer (): string | undefined {
    return this.element.find('div.rightanswer').text().split(/:\s/, 2)[1]
  }

  /**
   * Correctness
   *
   * @returns Correctness
   */
  get correct (): boolean | undefined {
    // Check if the question is correct by its classes
    if (this.element.hasClass('correct')) {
      return true
    }

    // Check if the question is incorrect by its classes
    if (this.element.hasClass('incorrect')) {
      return false
    }

    // Get the question state
    const state = this.element.find('div.state').text().toLowerCase()

    // Check if the question state starts with 'correct'
    if (state.startsWith('correct')) {
      return true
    }

    // Check if the question state starts with 'incorrect'
    if (state.startsWith('incorrect')) {
      return false
    }

    // Grade can have format like 1.00 or 1,00
    const grade = this.element.find('div.grade').text().match(/\d+[.,]\d+/g)

    // If the question has 2 grades, the second one is the max grade, so compare them
    if (grade?.length === 2) {
      return grade[0] === grade[1]
    }
  }
}
