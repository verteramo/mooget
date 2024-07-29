/*******************************************************************************
 * MoodleQuiz.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import $ from 'jquery'
import { Md5 } from 'ts-md5'

/** Package dependencies */
import { MoodleQuestion } from './MoodleQuestion'
import { MoodleQuizType } from './MoodleQuizType'

/** Project dependencies */
import { applyMiddlewares } from '@/core/arch/Middleware'
import { reduce } from '@/core/arch/Reducer'
import { IQuestion } from '@/core/models/IQuestion'
import { IQuiz } from '@/core/models/IQuiz'
import { QuestionHandler, QuestionMiddleware } from '@/core/parsing/Question'
import { partial } from '@/core/services/native'

/**
 * DOM quiz extractor
 */
export class MoodleQuiz {
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
  get type (): MoodleQuizType | undefined {
    switch (document.body.id) {
      case MoodleQuizType.Review:
        return MoodleQuizType.Review

      case MoodleQuizType.Attempt:
        return MoodleQuizType.Attempt
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
   * Questions
   */
  async * questions (handlers: QuestionHandler[] = []): AsyncIterable<IQuestion> {
    // Loop through questions
    for (const element of $('div.que')) {
      const question = new MoodleQuestion($(element))

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
            ...await reduce(question.type, handlers, question)
          })
        }
      }
    }
  }

  /**
   * Get quiz from the DOM
   */
  static async extract ({ handlers = [], middlewares = [], fetchVersion }: {
    handlers?: QuestionHandler[]
    middlewares?: QuestionMiddleware[]
    fetchVersion?: (url: string) => Promise<string | undefined>
  }): Promise<IQuiz | undefined> {
    const quiz = new MoodleQuiz()

    // Mandatory properties
    if (
      quiz.type !== undefined &&
      quiz.name !== undefined &&
      quiz.category !== undefined
    ) {
      const questions: IQuestion[] = []

      for await (const question of quiz.questions(handlers)) {
        console.log('question', question)
        questions.push(await applyMiddlewares(question, middlewares))
      }

      console.log('fetching version', quiz.home)

      let version: string | undefined

      if (
        quiz.home !== undefined &&
        fetchVersion !== undefined
      ) {
        version = await fetchVersion(quiz.home)
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
          version
        })
      }
    }
  }
}
