/**
 * Page analyzer
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { getVersion } from '@/scripts/background'
import { Md5 } from 'ts-md5'

import {
  BaseQuestion,
  DragAndDropQuestion,
  IQuestion,
  MatchQuestion,
  MultianswerQuestion,
  MultichoiceQuestion,
  QuestionType,
  TextQuestion
} from '@/dom'

import $ from 'jquery'

/**
 * Page type
 *
 * It is the body ID
 */
export enum PageType {
  Review = 'page-mod-quiz-review',
  Attempt = 'page-mod-quiz-attempt'
}

/**
 * Test interface
 *
 * It is the quiz data
 */
export interface IQuiz {
  type: PageType | undefined
  url: string | undefined
  home: string | undefined
  icon: string | undefined
  name: string
  category: string | undefined
  version: string | undefined
  questions: IQuestion[]
  id: string
  favorite?: boolean
}

/**
 * Page class
 *
 * It is the DOM page
 */
export class Page {
  /**
   * Page type
   *
   * It is the body ID
   * @returns Page type
   */
  get type (): PageType | undefined {
    switch (document.body.id) {
      case PageType.Review:
        return PageType.Review

      case PageType.Attempt:
        return PageType.Attempt
    }
  }

  /**
   * Quiz URL
   *
   * Takes the first link that starts with http and contains /mod/quiz
   * The only required parameter is 'attempt'
   * So the quiz URL will be something like
   * Example: 'http://site.com/mod/quiz/attempt.php?attempt=123'
   *
   * @link https://github.com/moodle/moodle/blob/main/mod/quiz/review.php
   * @link https://github.com/moodle/moodle/blob/main/mod/quiz/attempt.php
   * @returns Quiz URL
   */
  get url (): URL | undefined {
    const href = $('a[href^="http"][href*="/mod/quiz"][href*="attempt="]').attr('href')

    if (href !== undefined) {
      const { origin, pathname, searchParams } = new URL(href)
      const attempt = searchParams.get('attempt')

      if (attempt !== null) {
        return new URL(`${origin}${pathname}?attempt=${attempt}`)
      }
    }
  }

  /**
   * Site home
   *
   * It is the base URL of the site
   * It could be a subdirectory like 'site.com/path/to/moodle'
   *
   * @returns Quiz home
   */
  get home (): string | undefined {
    return this.url?.href.replace(/\/mod\/quiz.*/, '')
  }

  /**
   * Site icon
   *
   * It comes from the link with rel="shortcut icon"
   * In the case that shortcut icon is default 'favicon',
   * it will take the first image with class 'logo'
   *
   * @returns Site icon
   */
  get icon (): string | undefined {
    const icon = $('link[rel="shortcut icon"]').attr('href')

    if (icon?.endsWith('/favicon') === false) {
      return icon
    }

    return $('span.logo > img, img.logo').attr('src')
  }

  /**
   * Quiz name
   *
   * It comes from the last breadcrumb-item
   *
   * @returns Quiz name
   */
  get name (): string {
    return $('li.breadcrumb-item').last().text().replace(/\s+/g, ' ').trim()
  }

  /**
   * Quiz category
   *
   * It comes from the first breadcrumb-item with title
   *
   * @returns Quiz category
   */
  get category (): string | undefined {
    return $('li.breadcrumb-item a[title]').first().attr('title')?.replace(/\s+/g, ' ').trim()
  }

  /**
   * Site version
   *
   * It comes from the /lib/upgrade.txt endpoint
   * Its format includes major, minor, and optionally patch value (x.x.x)
   *
   * @returns Site version
   */
  get version (): Promise<string | undefined> | undefined {
    const home = this.home

    if (home !== undefined) {
      return getVersion(home)
    }
  }

  /**
   * Quiz questions
   *
   * @returns Questions
   */
  async * questions (): AsyncIterable<IQuestion> {
    // Loop through questions
    for (const element of $('div.que')) {
      // Create the question
      const baseQuestion = new BaseQuestion($(element))

      const currentQuestion: IQuestion = {
        id: baseQuestion.id,
        type: baseQuestion.type
      }

      if (baseQuestion.content !== undefined) {
        currentQuestion.content = baseQuestion.content
      }

      if (baseQuestion.feedback !== undefined) {
        currentQuestion.feedback = baseQuestion.feedback
      }

      switch (baseQuestion.type) {
        case QuestionType.Description:{
          yield currentQuestion
          break
        }

        case QuestionType.Text:{
          const textQuestion = new TextQuestion($(element))
          yield {
            ...currentQuestion,
            answer: textQuestion.answer
          }
          break
        }

        case QuestionType.Match:{
          const matchQuestion = new MatchQuestion($(element))
          yield {
            ...currentQuestion,
            answer: matchQuestion.answer
          }
          break
        }

        case QuestionType.Multichoice:{
          const multichoiceQuestion = new MultichoiceQuestion($(element))
          yield {
            ...currentQuestion,
            answer: await multichoiceQuestion.answer
          }
          break
        }

        case QuestionType.Multianswer:{
          const multianswerQuestion = new MultianswerQuestion($(element))
          yield {
            ...currentQuestion,
            answer: multianswerQuestion.answer
          }
          break
        }

        case QuestionType.DragAndDrop:{
          const dragAndDropQuestion = new DragAndDropQuestion($(element))
          yield {
            ...currentQuestion,
            answer: dragAndDropQuestion.answer
          }
          break
        }
      }
    }
  }

  /**
   * Get quiz from the DOM
   *
   * @returns Quiz
   */
  static async getQuiz (): Promise<IQuiz | undefined> {
    const page = new Page()

    if (page.type !== undefined) {
      const questions: IQuestion[] = []

      for await (const question of page.questions()) {
        questions.push(question)
      }

      return {
        type: page.type,
        url: page.url?.href,
        home: page.home,
        icon: page.icon,
        name: page.name,
        category: page.category,
        version: await page.version,
        id: Md5.hashStr(page.name),
        questions
      }
    }
  }
}
