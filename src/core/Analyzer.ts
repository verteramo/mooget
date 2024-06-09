/**
 * Analyzer
 * Extracts the context from DOM
 *
 * @link https://github.com/verteramo
 * @license GNU GPLv3
 */

import * as cheerio from 'cheerio'
import { Subject } from "./Utils"

export enum TestType {
  Attempt = 'page-mod-quiz-attempt',
  Review = 'page-mod-quiz-review',
}

/**
 * Question interface
 * @property html Question HTML
 * @property answer Question answers
 */
export interface Question {
  html: string
  answer?: any[]
}

/**
 * Test interface
 * @property id Test ID
 * @property name Test name
 * @property questions Test questions
 */
export interface Test {
  id: string
  name: string
  questions: Question[]
}

/**
 * Context interface
 * @property url Page URL
 * @property version Moodle version
 * @property test Test
 */
export interface Context {
  url: string
  version: string
  type: TestType
  test: Test
}

/**
 * Analyzer
 * Extracts context from DOM
 */
export class Analyzer {
  // Cheerio instance
  private $: cheerio.Root

  /**
   * Constructor
   */
  constructor() {
    this.$ = cheerio.load(document.body.innerHTML)
  }

  /**
   * Gets the home URL
   * @returns Home URL
   */
  get url(): string {
    return this.$('[data-key=home] a').attr('href') as string
  }

  /**
   * Gets the test name
   * @returns Test name
   */
  get name(): string {
    return this.$('.breadcrumb-item:last').text().replace(/\\n/g, '').trim()
  }

  /**
   * Gets the questions
   * @returns Questions
   */
  async *questions(): AsyncIterable<Question> {
    for (const question of this.$('.que')) {
      // Question HTML
      let html = this.$(question).find('.qtext').html() as string

      // Replaces all images URL with their Base64 representation
      for (const image of this.$(question).find('.qtext img')) {
        const src = this.$(image).attr('src') as string
        html = html.replace(src, await chrome.runtime.sendMessage({
          subject: Subject.ConvertImage, data: { src }
        }))
      }

      // Question answers
      const answer = []

      // Gets the right answer
      const rightanswer = this.$(question).find('.rightanswer').text()

      // Checks if the question is correct by its classes
      const classes = (this.$(question).attr('class') as string).split(' ')
      let correct = classes.includes('correct')

      // If the question doesn't have the correct class, checks the grades
      if (!correct) {
        // Gets the grades
        const grade = this.$(question).find('.grade').text().match(
          /\d+[.,]\d+/g
        )

        // If the question has two grades,
        // the second one is the max grade,
        // so checks if they are equal
        if (!correct && grade?.length == 2) {
          const [grade1, grade2] = grade
          if (grade1 === grade2) {
            correct = true
          }
        }
      }

      // Gets the question type as the second class
      const [, type] = classes
      switch (type) {
        // Description question
        case 'description':
          yield { html }
          continue

        // Multiple choice questions
        case 'truefalse':
        case 'multichoice':
        case 'calculatedmulti':
          for (const option of this.$(question).find('.answer > div')) {
            const checked = this.$(option).find('input').attr('checked') === 'checked'

            // Deletes list item letters (ex: a. B. 1. ...)
            const [, , optionText] = this.$(option).text().match(
              /([\w\d]\.\s)?(.+)\s/
            ) as string[]

            // Pushes the answer with its correctness
            answer.push({
              text: optionText,
              correct: (correct && checked) ||
                rightanswer.includes(optionText)
            })
          }

          break

        // Matching questions
        case 'match':
        case 'randomsamatch':
          console.log("Match")
          const row = this.$(question).find('.answer > tbody > tr')
          const options = this.$(row).find('.control > select > option:not(:first-child)')
          console.log(options.html())
          break
          for (const option of this.$(row).find('td.text')) {
            console.log("Option: " + this.$(option).text())
          }

          break

        // Short answer questions
        case 'shortanswer':
        case 'numerical':
        case 'calculated':
        case 'calculatedsimple':
          if (rightanswer) {
            const [, rightanswerText] = rightanswer.split(/\:\s/, 2) as string[]
            answer.push({ text: rightanswerText })
          }
          else if (correct) {
            const answerText = this.$(question).find('.answer > input').text()
            answer.push({ text: answerText })
          }

          break
      }

      // Generates the question
      yield { html, answer }
    }
  }

  /**
   * Gets the context
   * @returns Context
   */
  async getContext(): Promise<Context> {
    const url = this.url
    const name = this.name
    const questions: Question[] = []

    const type = document.body.id as TestType

    const id = name.toLowerCase().replace(/\s/g, '-')

    const version = await chrome.runtime.sendMessage({
      subject: Subject.GetVersion, url
    })

    for await (const question of this.questions()) {
      questions.push(question)
    }

    return {
      url,
      version,
      type,
      test: {
        id,
        name,
        questions
      }
    }
  }
}
