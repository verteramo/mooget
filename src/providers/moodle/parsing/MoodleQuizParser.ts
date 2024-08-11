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

/** Project dependencies */
import { QuestionParserConstructor } from '@/core/parsing/QuestionParser'
import { QuestionReducerMap } from '@/core/parsing/QuestionReducer'
import { QuizParser } from '@/core/parsing/QuizParser'
import { MultichoiceQuestionReducer } from '../reducers/MultichoiceQuestionReducer'
import { MoodleQuestionParser } from './MoodleQuestionParser'
import { TrueFalseQuestionReducer } from '../reducers/TrueFalseQuestionReducer'
import { DragAndDropQuestionReducer } from '../reducers/DragAndDropQuestionReducer'
import { MatchQuestionReducer } from '../reducers/MatchQuestionReducer'
import { MultianswerQuestionReducer } from '../reducers/MultianswerQuestionReducer'
import { TextQuestionReducer } from '../reducers/TextQuestionReducer'

/**
 * DOM quiz extractor
 */
export class MoodleQuizParser extends QuizParser {
  /**
   * Base URL of the site;
   * could be a subdirectory like 'site.com/path/to/moodle'
   */
  private get home (): string | undefined {
    return this.url?.replace(/\/mod\/quiz.*/, '')
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
   * Question elements
   */
  get questions (): NodeListOf<HTMLElement> {
    return document.querySelectorAll('div.que')
  }

  /**
   * Validity
   */
  get valid (): boolean {
    return [
      'page-mod-quiz-review',
      'page-mod-quiz-attempt'
    ].includes(document.body.id)
  }

  /**
   * Reducers
   */
  get reducers (): QuestionReducerMap {
    return {
      ...DragAndDropQuestionReducer,
      ...MatchQuestionReducer,
      ...MultianswerQuestionReducer,
      ...MultichoiceQuestionReducer,
      ...TextQuestionReducer,
      ...TrueFalseQuestionReducer
    }
  }

  /**
   * Hash function
   */
  get hash (): (value: string) => string {
    return (value: string) => Md5.hashStr(value)
  }

  /**
   * Parser
   */
  get Parser (): QuestionParserConstructor {
    return MoodleQuestionParser
  }
}
