/**
 * Analyzer
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import jquery from 'jquery'
import * as cheerio from 'cheerio'
import { Md5 } from 'ts-md5'
import { Subject } from "./Utils"
import { getCssSelector } from './Utils'

const ChoiceRegex = /([\w\d]\.\s)?(.+)\s/
const RightanswerRegex = /\:\s/
const GradeRegex = /\d+[.,]\d+/g

/**
 * Question interface
 * @property html Question HTML
 * @property answer Question answer
 */
export interface Question {
  id: string
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
 * @property type Page type
 * @property url Page URL
 * @property version Moodle version
 * @property test Test
 */
export interface Context {
  type: string
  url: string
  version: string
  test?: Test
}

/**
 * Extract context from DOM
 */
export class Analyzer {

  /** Cheerio instance */
  private readonly $: cheerio.Root

  /** Constructor */
  constructor() {
    this.$ = cheerio.load(document.body.innerHTML)
  }

  /**
   * Get the page type
   * @returns Page type
   */
  get type(): string {
    return document.body.id
  }

  /**
   * Get the home URL
   * @returns Home URL
   */
  get url(): string {
    return this.$('[data-key=home] a').attr('href') as string
  }

  /**
   * Get the test name
   * @returns Test name
   */
  get name(): string {
    return this.$('.breadcrumb-item:last').text().trim()
  }

  /**
   * Get the questions
   * @returns Questions
   */
  async *questions(): AsyncIterable<Question> {
    for (const question of this.$('.que')) {
      // Question HTML
      const qtext = this.$(question).find('.qtext')
      const id = Md5.hashStr(qtext.text() as string) as string
      let html = qtext.html() as string

      // Replace all images URLs with their Base64 representation
      for (const image of this.$(question).find('.qtext img')) {
        const src = this.$(image).attr('src') as string
        html = html.replace(src, await chrome.runtime.sendMessage({
          subject: Subject.ConvertImage, data: { src }
        }))
      }

      // Question answers
      const answer = []

      // Get the right answer
      const rightanswer = this.$(question).find('.rightanswer').text()

      // Check if the question is correct by its classes
      const classes = (this.$(question).attr('class') as string).split(' ')
      let correct = classes.includes('correct')

      // If the question doesn't have the correct class, check the grades
      if (!correct) {
        // If the question has two grades,
        // the second one is the max grade,
        // so check if they are equal
        const grade =
          this.$(question).find('.grade').text().match(GradeRegex)

        if (grade?.length === 2) {
          const [grade1, grade2] = grade
          correct = grade1 === grade2
        }
      }

      // Get the question type as the second class
      const [, type] = classes
      switch (type) {

        /** Description questions */
        case 'description':
          yield { id, html }

          continue

        /** Multiple choice questions */
        case 'truefalse':
        case 'multichoice':
        case 'calculatedmulti':
          for (const option of this.$(question).find('.answer > div')) {
            const checked = this.$(option).find('input').attr('checked') === 'checked'

            // Delete list item enumerations (ex: a. B. 1. ...)
            const [, , optionText] =
              this.$(option).text().match(ChoiceRegex) as string[]

            // Push the answer with its correctness
            answer.push({
              text: optionText,
              correct: (correct && checked) ||
                rightanswer.includes(optionText)
            })
          }

          break

        /** TODO */
        /** Matching questions */
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

        /** Text questions */
        case 'shortanswer':
        case 'numerical':
        case 'calculated':
        case 'calculatedsimple':
        case 'essay':
          if (rightanswer) {
            // If the question has a right answer, get it
            const [, rightanswerText] = rightanswer.split(RightanswerRegex, 2) as string[]
            answer.push({ text: rightanswerText })
          }
          else if (correct) {
            // Else, if the answer is correct, get it
            const answerText = this.$(question).find('.answer > input').text()
            answer.push({ text: answerText })
          }

          break
      }

      // Generate the question
      yield { id, html, answer }
    }
  }

  /**
   * Get the context
   * @returns Context
   */
  async getContext(): Promise<Context> {
    const type = this.type
    const url = this.url
    const name = this.name
    const id = Md5.hashStr(name) as string
    const questions: Question[] = []

    // Get the site version from the upgrade.txt file
    const version = await chrome.runtime.sendMessage({
      subject: Subject.GetVersion, url
    })

    // Generate the test questions
    for await (const question of this.questions()) {
      questions.push(question)
    }

    // Return the context
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

  answerTest(test: Test) {
    for (const question of this.$('.que')) {
      const questionId = Md5.hashStr(this.$(question).find('.qtext').text() as string) as string

      // Get the question from the storage
      const storageQuestion = test.questions.find(({ id }) => id === questionId)

      // If the question is in the storage, answer it
      if (storageQuestion) {
        // Get the question type as the second class
        const [, type] = (this.$(question).attr('class') as string).split(' ')
        switch (type) {
          /** Multiple choice questions */
          case 'truefalse':
          case 'multichoice':
          case 'calculatedmulti':
            for (const option of this.$(question).find('.answer > div')) {
              const [, , optionText] =
                this.$(option).text().match(ChoiceRegex) as string[]

              // Get the answer from the storage
              const storageAnswer = storageQuestion.answer?.find(({ text }) => text === optionText)

              // If the answer is correct, check it
              if (storageAnswer?.correct) {
                const cssSelector = getCssSelector(this.$, option)
                jquery(cssSelector).addClass('mooget-correct-answer')
              }
            }

            break
        }
      }
    }
  }
}
