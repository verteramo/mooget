/*******************************************************************************
 * IConfig.ts
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
  primary: string

  /**
   * Current language
   */
  language: string
}
