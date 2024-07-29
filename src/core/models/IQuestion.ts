/*******************************************************************************
 * IQuestion.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Package dependencies */
import { IAnswer } from './IAnswer'

/**
 * It is the question data
 */
export interface IQuestion {
  /**
   * MD5 hash of the div.formulation element text;
   * HTML could be different because of the image URLs between sites
   */
  id: string

  /**
   * Second class of the div.que element
   */
  type: string

  /**
   * HTML content of the div.qtext element
   */
  content: string

  /**
   * HTML content of the div.rightanswer element
   */
  feedback?: string

  /**
   * Answer, if it can be determined;
   * it could be a boolean, a string or an array of IAnswer if there are multiple answers
   */
  answer?: boolean | string | Iterable<IAnswer>
}
