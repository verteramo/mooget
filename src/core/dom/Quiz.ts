/**
 * Quiz.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import $ from 'jquery'

import { Md5 } from 'ts-md5'

import { applyMiddlewares } from '@/core/utils/applyMiddlewares'
import { partial } from '@/core/utils/partial'
import { reduce } from '@/core/utils/reduce'

import { IQuestion } from '@/core/models/IQuestion'
import { IQuiz } from '@/core/models/IQuiz'

import { Question } from '@/core/dom/Question'
import { QuestionHandler } from '@/core/dom/QuestionHandler'
import { QuestionMiddleware } from '@/core/dom/QuestionMiddleware'
import { QuizType } from '@/core/dom/QuizType'

import { bgFetchVersion } from '@/scripts/background'

/**
 * DOM quiz extractor
 */
export class Quiz {
  /**
   * Last breadcrumb-item
   */
  get name (): string | undefined {
    const text = $('li.breadcrumb-item').last().text().replace(/\s+/g, ' ').trim()

    if (text.length > 0) {
      return text
    }
  }

  /**
   * First breadcrumb-item with title
   */
  get category (): string | undefined {
    const text = $('li.breadcrumb-item a[title]').first().attr('title')?.replace(/\s+/g, ' ').trim()

    if (text !== undefined && text.length > 0) {
      return text
    }
  }

  /**
   * Body ID
   */
  get type (): QuizType | undefined {
    switch (document.body.id) {
      case QuizType.Review:
        return QuizType.Review

      case QuizType.Attempt:
        return QuizType.Attempt
    }
  }

  /**
   * First link that starts with http and contains /mod/quiz;
   * the only required parameter is 'attempt'
   *
   * @example
   * 'https://site.com/mod/quiz/attempt.php?attempt=123'
   *
   * @link https://github.com/moodle/moodle/blob/main/mod/quiz/review.php
   * @link https://github.com/moodle/moodle/blob/main/mod/quiz/attempt.php
   */
  get url (): string | undefined {
    const href = $('a[href^="http"][href*="/mod/quiz"][href*="attempt="]').attr('href')?.trim()

    if (href !== undefined) {
      const { origin, pathname, searchParams } = new URL(href)
      const attempt = searchParams.get('attempt')

      if (attempt !== null) {
        return `${origin}${pathname}?attempt=${attempt}`
      }
    }
  }

  /**
   * Base URL of the site;
   * could be a subdirectory like 'site.com/path/to/moodle'
   */
  get home (): string | undefined {
    return this.url?.replace(/\/mod\/quiz.*/, '')
  }

  /**
   * Representative icon of the site;
   * it could be the favicon (preferred) or the navbar brand image
   */
  get icon (): string | undefined {
    const icon = $('link[rel="shortcut icon"]').attr('href')

    // If it is not the default favicon, returns it
    if (icon?.endsWith('/favicon') === false) {
      // If it is a full URL, returns it
      if (icon.startsWith('http')) {
        return icon
      }

      // If it is a relative URL, returns the home URL with the icon path
      if (icon.startsWith('/') && this.home !== undefined) {
        return this.home + icon
      }
    }

    // Returns the navbar brand image
    return $('a.navbar-brand img').attr('src')
  }

  /**
   * Navbar brand img alt or text
   */
  get brand (): string | undefined {
    return (
      $('a.navbar-brand img').attr('alt') ??
      $('a.navbar-brand').text().trim()
    )
  }

  /**
   * It comes from the /lib/upgrade.txt endpoint
   * Its format includes major, minor, and optionally patch value (x.x.x)
   */
  get version (): Promise<string | undefined> | undefined {
    const home = this.home

    if (home !== undefined) {
      return bgFetchVersion(home)
    }
  }

  /**
   * Questions
   */
  async * questions (handlers: QuestionHandler[] = []): AsyncIterable<IQuestion> {
    // Loop through questions
    for (const que of $('div.que')) {
      const element = $(que)
      const question = new Question(element)

      // Mandatory properties
      if (
        question.type !== undefined &&
        question.content !== undefined
      ) {
        yield {
          id: Md5.hashStr(question.content),
          type: question.type,
          content: question.content,
          ...partial<IQuestion>({
            feedback: question.feedback,
            ...await reduce(question.type, handlers, { element, question })
          })
        }
      }
    }
  }

  /**
   * Get quiz from the DOM
   */
  static async extract (
    handlers: QuestionHandler[] = [],
    middlewares: QuestionMiddleware[] = []
  ): Promise<IQuiz | undefined> {
    const quiz = new Quiz()

    // Mandatory properties
    if (
      quiz.type !== undefined &&
      quiz.name !== undefined &&
      quiz.category !== undefined
    ) {
      const questions: IQuestion[] = []

      for await (const question of quiz.questions(handlers)) {
        questions.push(await applyMiddlewares(question, middlewares))
      }

      return {
        id: Md5.hashStr(quiz.name + quiz.category),
        name: quiz.name,
        category: quiz.category,
        questions,
        ...partial<IQuiz>({
          type: quiz.type,
          url: quiz.url,
          home: quiz.home,
          icon: quiz.icon,
          brand: quiz.brand,
          version: await quiz.version
        })
      }
    }
  }
}
