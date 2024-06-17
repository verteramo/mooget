/**
 * Analyzer
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import $ from 'jquery'
import { Md5 } from 'ts-md5'
import { Subject } from './Utils'

const ChoiceRegex = /([\w\d]\.\s)?(.+)\s/
const RightanswerRegex = /:\s/
const GradeRegex = /\d+[.,]\d+/g

/**
 * Question interface
 * @property id Question ID
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
 * @property url Home URL
 * @property version Site version
 * @property test Test
 */
export interface Context {
  type: string
  url: string
  version: string
  test?: Test
}

/**
 * Analyzer class
 * Extract context from DOM
 */
export class Analyzer {
  /**
   * Get the page type
   * @returns Page type
   */
  get type (): string {
    return document.body.id
  }

  /**
   * Get the home URL
   * @returns Home URL
   */
  get url (): string {
    return $('[data-key=home] a').attr('href') as string
  }

  /**
   * Get the test name
   * @returns Test name
   */
  get name (): string {
    return $('.breadcrumb-item:last').text().trim()
  }

  /**
   * Get the questions
   * @returns Questions
   */
  async * questions (): AsyncIterable<Question> {
    for (const question of $('.que')) {
      const qtext = $(question).find('.qtext')
      // Question ID : md5 hash of the question text
      const id = Md5.hashStr(qtext.text())
      let html = qtext.html()

      // Replace all images URLs with their Base64 representation
      for (const image of $(question).find('.qtext img')) {
        const src = $(image).attr('src') as string
        html = html.replace(src, await chrome.runtime.sendMessage({
          subject: Subject.ConvertImage, data: { src }
        }))
      }

      // Question answers
      const answer = []

      // Get the right answer
      const [, rightanswer] = $(question).find('.rightanswer').text().split(RightanswerRegex, 2)

      // Check if the question is correct by its classes
      let correct = $(question).hasClass('correct')

      // If the question doesn't have the correct class, check the grades
      if (!correct) {
        // If the question has two grades,
        // the second one is the max grade,
        // so check if they are equal
        const grade =
          $(question).find('.grade').text().match(GradeRegex)

        if (grade?.length === 2) {
          const [grade1, grade2] = grade
          correct = grade1 === grade2
        }
      }

      // Get the question type as the second class
      const [, type] = ($(question).attr('class') as string).split(' ')
      switch (type) {
        /** Description questions */
        case 'description':
          yield { id, html }
          continue

        /** Multiple choice questions */
        case 'truefalse':
        case 'multichoice':
        case 'calculatedmulti':
          for (const option of $(question).find('.answer > div')) {
            const checked = $(option).find('input').attr('checked') === 'checked'

            // Delete list item enumerations (ex: a. B. 1. ...)
            const [, , text] =
              $(option).text().match(ChoiceRegex) as string[]

            // Push the answer with its correctness
            answer.push({
              text,
              correct: (correct && checked) || rightanswer.includes(text)
            })
          }

          break

        /** TODO */
        /** Matching questions */
        case 'match':
        case 'randomsamatch': {
          console.log('Match')
          const row = $(question).find('.answer > tbody > tr')
          const options = $(row).find('.control > select > option:not(:first-child)')
          console.log(options.html())
          break
          // for (const option of $(row).find('td.text')) {
          //   console.log('Option: ' + $(option).text())
          // }

          // break
        }

        /** Text questions */
        case 'shortanswer':
        case 'numerical':
        case 'calculated':
        case 'calculatedsimple':
        case 'essay':
          // If the question has a right answer, get it
          answer.push({
            text: rightanswer ?? $(question).find('.answer > input').text()
          })

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
  async getContext (): Promise<Context> {
    const type = this.type
    const url = this.url
    const name = this.name
    const id = Md5.hashStr(name)
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

  answerTest (test: Test): void {
    for (const question of $('.que')) {
      const questionId = Md5.hashStr($(question).find('.qtext').text())

      // Get the question from the storage
      const storageQuestion = test.questions.find(({ id }) => id === questionId)

      // If the question is in the storage, answer it
      if (storageQuestion != null) {
        // Get the question type as the second class
        const [, type] = ($(question).attr('class') as string).split(' ')
        switch (type) {
          /** Multiple choice questions */
          case 'truefalse':
          case 'multichoice':
          case 'calculatedmulti':
            for (const option of $(question).find('.answer > div')) {
              const [, , optionText] =
                $(option).text().match(ChoiceRegex) as string[]

              // Get the answer from the storage
              const storageAnswer = storageQuestion.answer?.find(({ text }) => text === optionText)

              // If the answer is correct, check it
              if (storageAnswer?.correct as boolean) {
                $(option).css('background-color', 'pink')
              }
            }

            break
        }
      }
    }
  }
}
