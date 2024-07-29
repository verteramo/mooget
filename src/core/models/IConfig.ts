/*******************************************************************************
 * IConfig.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/**
 * Configuration like current theme and language
 */
export interface IConfig {
  /**
   * Current theme
   */
  mode: 'light' | 'dark'

  /**
   * Current primary palette
   */
  primary: string

  /**
   * Current language
   */
  language: string
}
