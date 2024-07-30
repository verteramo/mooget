/*******************************************************************************
 * MoodleQuizProvider.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import $ from 'jquery'
import { Md5 } from 'ts-md5'

/** Package dependencies */
import { qhDragAndDrop } from '../handlers/qhDragAndDrop'
import { qhMatch } from '../handlers/qhMatch'
import { qhMultianswer } from '../handlers/qhMultianswer'
import { qhMultichoice } from '../handlers/qhMultichoice'
import { qhText } from '../handlers/qhText'
import { qhTrueFalse } from '../handlers/qhTrueFalse'

/** Project dependencies */
import { QuestionHandler } from '@/core/parsing/Question'
import { QuizProvider } from '@/core/parsing/Quiz'
import { bgFetchMoodleVersion } from '@/scripts/background'

/**
 * DOM quiz extractor
 */
export class MoodleQuizProvider extends QuizProvider {
  /**
   * Hash function
   */
  get hash (): (value: string) => string {
    return (value: string) => Md5.hashStr(value)
  }

  /**
   * Body ID
   */
  get type (): string | undefined {
    if (
      document.body.id === 'page-mod-quiz-review' ||
      document.body.id === 'page-mod-quiz-attempt'
    ) {
      return document.body.id
    }
  }

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
  get owner (): string | undefined {
    const value = (
      $('a.navbar-brand img').attr('alt') ??
      $('a.navbar-brand').text().trim()
    )

    if (value.length > 0) {
      return value
    }
  }

  /**
   * Version of the quiz
   */
  get version (): string | undefined | Promise<string | undefined> {
    const home = this.home

    if (home !== undefined) {
      return bgFetchMoodleVersion(home)
    }
  }

  get questions (): JQuery<HTMLElement> {
    return $('div.que')
  }

  get handlers (): QuestionHandler[] {
    return [
      qhDragAndDrop,
      qhMatch,
      qhMultianswer,
      qhMultichoice,
      qhText,
      qhTrueFalse
    ]
  }
}
