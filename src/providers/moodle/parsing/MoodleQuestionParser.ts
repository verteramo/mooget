/*******************************************************************************
 * MoodleQuestionParser.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Project dependencies */
import { QuestionType } from '@/core/models/QuestionType'
import { QuestionParser } from '@/core/parsing/QuestionParser'

/**
 * Extracts information from the DOM div.que element
 */
export class MoodleQuestionParser extends QuestionParser {
  /**
   * Second class of the div.que element
   */
  get type (): QuestionType | undefined {
    switch (this.element.classList.item(1)) {
      case 'ddwtos':
        return QuestionType.DragAndDrop

      case 'match':
        return QuestionType.Match

      case 'multichoice':
        return QuestionType.Multichoice

      case 'essay':
      case 'numerical':
      case 'calculated':
      case 'shortanswer':
        return QuestionType.Text

      case 'truefalse':
        return QuestionType.TrueFalse
    }
  }

  /**
   * HTML content of the div.qtext element
   */
  get content (): string | undefined {
    return this.element.querySelector('div.qtext')?.innerHTML
  }

  /**
   * HTML content of the div.generalfeedback element
   */
  get feedback (): string | undefined {
    return this.element.querySelector('div.generalfeedback')?.innerHTML
  }

  /**
   * Second part of the div.rightanswer text (split by ': ')
   */
  get rightanswer (): string | undefined {
    return this.element.querySelector('div.rightanswer')?.textContent?.split(/:\s/)[1]
  }

  /**
   * Correctness, if it can be determined
   */
  get correct (): boolean | undefined {
    // By classes
    if (this.element.classList.contains('correct')) {
      return true
    }

    if (this.element.classList.contains('incorrect')) {
      return false
    }

    // By grades
    // If it has not been determined by classes, check the grades
    // If the question has 2 grades, the second one is the max grade, so compare them
    // Grades can have format like 1.00 or 1,00 (in some languages)
    const grades = this.element.querySelector('div.grade')?.textContent?.match(/\d+[.,]\d+/g)

    if (grades?.length === 2) {
      return grades[0] === grades[1]
    }

    // By state
    // Check if the state starts with 'correct' or 'incorrect'
    const state = this.element.querySelector('div.state')?.textContent?.toLowerCase()

    if (state?.startsWith('correct') === true) {
      return true
    }

    if (state?.startsWith('incorrect') === true) {
      return false
    }
  }
}
