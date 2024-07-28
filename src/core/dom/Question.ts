/**
 * Question.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

/**
 * Extracts information from the DOM div.que element
 */
export class Question {
  /**
   * JQuery div.que element
   */
  private readonly $element: JQuery<HTMLElement>

  /**
   * @param $element JQuery div.que element
   */
  constructor ($element: JQuery<HTMLElement>) {
    this.$element = $element
  }

  /**
   * Second class of the div.que element
   */
  get type (): string | undefined {
    return this.$element.attr('class')?.split(/\s+/)[1]
  }

  /**
   * HTML content of the div.qtext element
   */
  get content (): string | undefined {
    return this.$element.find('div.qtext').html()?.trim()
  }

  /**
   * Second part of the div.rightanswer text (split by ': ')
   */
  get rightanswer (): string | undefined {
    return this.$element.find('div.rightanswer').text().split(/:\s/, 2)[1]
  }

  /**
   * HTML content of the div.generalfeedback element
   */
  get feedback (): string | undefined {
    return this.$element.find('div.generalfeedback').html()
  }

  /**
   * Correctness, if it can be determined
   */
  get correct (): boolean | undefined {
    // By classes
    if (this.$element.hasClass('correct')) {
      return true
    }

    if (this.$element.hasClass('incorrect')) {
      return false
    }

    // By grades
    // If it has not been determined by classes, checks the grades
    // If the question has 2 grades, the second one is the max grade, so compares them
    // Grades can have format like 1.00 or 1,00 (in some languages)
    const grades = this.$element.find('div.grade').text().match(/\d+[.,]\d+/g)

    if (grades?.length === 2) {
      return grades[0] === grades[1]
    }

    // By state
    // Checks if the state starts with 'correct' or 'incorrect'
    const state = this.$element.find('div.state').text().toLowerCase()

    if (state.startsWith('correct')) {
      return true
    }

    if (state.startsWith('incorrect')) {
      return false
    }
  }
}
