/*******************************************************************************
 * Config.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/**
 * Configuration interface
 */
export interface Config {

  /**
   * Current theme
   */
  mode: 'light' | 'dark'

  /**
   * Current primary color
   */
  color: string

  /**
   * Current language
   */
  language: string

  /**
   * Clipboard enabled flag
   */
  clipboard: boolean

  /**
   * Reveal answers flag
   */
  visibility: boolean

  /**
   * Quiz ID to print
   */
  printQuizId: string
}
