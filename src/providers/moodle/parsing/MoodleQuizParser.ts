/*******************************************************************************
 * MoodleQuizParser.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import $ from 'jquery'
import { Md5 } from 'ts-md5'

// Project dependencies
import { QuizParser } from '@/parsing'
import { sendMessage } from '@/utilities/messaging'

/**
 * DOM quiz extractor
 */
export class MoodleQuizParser extends QuizParser {
  get canHandleDocument (): boolean {
    return [
      'page-mod-quiz-attempt',
      'page-mod-quiz-review'
    ].includes(document.body.id)
  }

  /**
   * Last breadcrumb-item
   */
  get name (): string {
    return $('li.breadcrumb-item').last().text().replace(/\s+/g, ' ').trim()
  }

  /**
   * First breadcrumb-item with title
   */
  get category (): string | undefined {
    return $('li.breadcrumb-item a[title]').first().attr('title')?.replace(/\s+/g, ' ').trim()
  }

  /**
   * Question elements
   */
  get questions (): NodeListOf<HTMLElement> {
    return document.querySelectorAll('div.que')
  }

  /**
   * Hash function
   */
  get hash (): (value: string) => string {
    return (value: string) => Md5.hashStr(value)
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
  private get home (): string | undefined {
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
  get owner (): string {
    return (
      $('a.navbar-brand img').attr('alt') ??
      $('a.navbar-brand').text().trim()
    )
  }

  /**
   * Version of the site
   */
  get version (): Promise<string | undefined> | undefined {
    if (this.home !== undefined) {
      return sendMessage('getMoodleVersion', this.home)
    }
  }
}
