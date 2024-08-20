/*******************************************************************************
 * DaypoQuizProvider.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import $ from 'jquery'
import { Md5 } from 'ts-md5'

// Project dependencies
import { QuizParser } from '@/parsing'

export class DaypoQuizParser extends QuizParser {
  get name (): string | undefined {
    const clone = $('h1.titu').clone()

    clone.find('span#borrado').remove()
    clone.find('script').remove()

    const value = clone.text().trim()

    if (value.length > 0) {
      return value
    }
  }

  get category (): string | undefined {
    const value = $('a.cp').text().trim()

    if (value.length > 0) {
      return value
    }
  }

  get url (): string {
    const { origin, pathname } = new URL(window.location.href)

    return origin + pathname
  }

  get home (): string {
    const { origin } = new URL(window.location.href)

    return origin
  }

  get icon (): string | undefined {
    const src = $('header img').attr('src')

    if (src !== undefined) {
      return this.home + src
    }
  }

  get owner (): string | undefined {
    const withPicture = (
      $('table.col1 table td:last-child > div:first-child')
        .text()
        .trim()
    )

    if (withPicture.length > 0) {
      return withPicture
    }

    const withoutPicture = (
      $('table.col1 td span:nth-of-type(3)').get(0)
        ?.nextSibling
        ?.nextSibling
        ?.nodeValue
        ?.trim()
    )

    if (withoutPicture !== undefined && withoutPicture.length > 0) {
      return withoutPicture
    }
  }

  get questions (): NodeListOf<HTMLElement> {
    return document.querySelectorAll('#ven3')
  }

  get hash (): (value: string) => string {
    return (value: string) => Md5.hashStr(value)
  }

  get canHandleDocument (): boolean {
    return [
      'tod'
    ].includes(document.body.id)
  }
}
