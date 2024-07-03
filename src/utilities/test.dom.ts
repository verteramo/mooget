/**
 * Analyzer
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { Answer, Question, QuestionType, TestType } from '@/models'
import { getVersion } from '@/scripts/background'
import { replaceImages } from '@/utilities'
import $ from 'jquery'
import { Md5 } from 'ts-md5'

/**
 * Question class
 * Extract questions from DOM
 */
class BaseQuestion {
  /** Question element */
  protected readonly element: JQuery<HTMLElement>

  /**
   * Construct the question from the element
   * @param element Question element
   */
  constructor (element: JQuery<HTMLElement>) {
    this.element = element
  }

  /**
   * Get the question ID
   * It's the MD5 hash of the question text content
   * @returns Question ID
   */
  get id (): string {
    return Md5.hashStr(this.element.find('div.qtext').text())
  }

  /**
   * Get the question content with images replaced as base64
   * @returns Question content
   */
  get content (): Promise<string> {
    return replaceImages(this.element.find('div.qtext'))
  }

  /**
   * Get the right answer
   * @returns Right answer
   */
  protected get rightanswer (): string {
    return this.element.find('div.rightanswer').text().split(/:\s/, 2)[1]
  }

  /**
   * Get the question correctness
   * @returns Correctness
   */
  protected get correct (): boolean {
    // Check if the question is correct by its classes
    let correct = this.element.hasClass('correct')

    // If the question doesn't have the correct class, check the grades
    if (!correct) {
      correct = this.element.find('div.state').text().toLowerCase().startsWith('correct')

      if (!correct) {
        // If the question has two grades,
        // the second one is the max grade,
        // so check if they are equal
        const grade = this.element.find('div.grade').text().match(/\d+[.,]\d+/g)

        if (grade?.length === 2) {
          const [grade1, grade2] = grade
          correct = grade1 === grade2
        }
      }
    }

    return correct
  }

  /**
   * Get the question type
   * @returns Question type
   */
  get type (): QuestionType {
    const classes = (this.element.attr('class') as string).split(' ')

    if (classes.length > 1) {
      switch (classes[1]) {
        // Description question
        case 'description':
          return QuestionType.Description

        // Multiple choice question
        case 'truefalse':
        case 'multichoice':
        case 'calculatedmulti':
          return QuestionType.Multichoice

        // Matching question
        case 'match':
        case 'randomsamatch':
          return QuestionType.Match

        // Text question
        case 'shortanswer':
        case 'numerical':
        case 'calculated':
        case 'calculatedsimple':
        case 'essay':
          return QuestionType.Text
      }
    }

    return QuestionType.Unknown
  }
}

class DescriptionQuestion extends BaseQuestion {}

class MultichoiceQuestion extends BaseQuestion {
  get answer (): Promise<Answer[]> {
    return (async () => {
      const answer: Answer[] = []

      for (const option of this.element.find('div.answer > div')) {
        const checked = $(option).find('input').attr('checked') === 'checked'
        const answerContent = await replaceImages($(option).find('div > div'))
        // Check if the answer is correct
        const answerCorrect =
          this.correct ? checked : this.rightanswer?.includes(answerContent)

        // Push the answer with its correctness
        answer.push({
          content: answerContent,
          correct: answerCorrect
        })
      }

      return answer
    })()
  }
}

class MatchQuestion extends BaseQuestion {
  get answer (): Answer[] {
    const optionsSelector = 'table.answer > tbody > tr:first-child > td.control > select > option:not(:first-child)'
    const options = this.element.find(optionsSelector).map((_, option) => $(option).html()).get()

    console.log('options:', options)

    const texts = this.element.find('table.answer > tbody > tr > td.text').map((_, text) => $(text).html()).get()

    console.log('texts:', texts)

    return []
  }
}

class TextQuestion extends BaseQuestion {
  get answer (): Answer[] {
    const answer: Answer[] = []

    if (this.rightanswer !== undefined) {
      answer.push({
        content: this.rightanswer,
        correct: true
      })
    } else if (this.element.find('div.answer > input').length > 0) {
      answer.push({
        content: this.element.find('div.answer > input').val() as string,
        correct: this.correct
      })
    } else if (this.element.find('div.answer > div[role=textbox]').length > 0) {
      answer.push({
        content: this.element.find('div.answer > div[role=textbox]').html(),
        correct: this.correct
      })
    }

    return answer
  }
}

/**
 * Test class
 * Extract context from DOM
 */
export class TestDOM {
  /**
   * Get the page type
   * @returns Page type
   */
  get type (): TestType {
    switch (document.body.id) {
      case 'page-mod-quiz-attempt':
        return TestType.Attempt

      case 'page-mod-quiz-review':
        return TestType.Review

      default:
        return TestType.Unknown
    }
  }

  /**
   * Get the quiz name
   * @returns Quiz name
   */
  get id (): string {
    return $('li.breadcrumb-item:last')
      .text()
      .trim()
      // Collapse spaces
      .replace(/\s+/g, ' ')
  }

  /**
   * Get the quiz category
   * @returns Quiz category
   */
  get category (): string {
    return $('li.breadcrumb-item a[title]:first')
      .text()
      .trim()
      // Collapse spaces
      .replace(/\s+/g, ' ')
  }

  /**
   * Get the site URL
   * @returns Site URL
   */
  get home (): string {
    const {
      origin,
      pathname
    } = new URL($('li[data-key=home] a').attr('href') as string)

    return (origin + pathname).replace(/\/$/, '')
  }

  /**
   * Get the quiz URL
   * @returns Quiz URL
   */
  get link (): string {
    const {
      origin,
      pathname,
      search
    } = new URL($('a.dropdown-toggle.nav-link:first').attr('href') as string)

    return origin + pathname + search
  }

  /**
   * Get the site version
   * @returns Site version
   */
  get version (): Promise<string> {
    return getVersion(this.home)
  }

  /**
   * Get the questions
   * @returns Questions
   */
  get questions (): Promise<Question[]> {
    return (async function () {
      const questions: Question[] = []
      for (const element of $('div.que')) {
        switch (new BaseQuestion($(element)).type) {
          case QuestionType.Description:{
            const question = new DescriptionQuestion($(element))
            questions.push({
              id: question.id,
              content: await question.content
            })
            break
          }

          case QuestionType.Multichoice:{
            const question = new MultichoiceQuestion($(element))
            questions.push({
              id: question.id,
              content: await question.content,
              answer: await question.answer
            })
            break
          }

          case QuestionType.Match:{
            const question = new MatchQuestion($(element))
            questions.push({
              id: question.id,
              content: await question.content,
              answer: question.answer
            })
            break
          }

          case QuestionType.Text:{
            const question = new TextQuestion($(element))
            questions.push({
              id: question.id,
              content: await question.content,
              answer: question.answer
            })
            break
          }
        }
      }

      return questions
    })()
  }
}
