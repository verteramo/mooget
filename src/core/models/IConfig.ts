/**
 * IConfig.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

/**
 * Configuration like current theme and language
 */
export interface IConfig {
  /**
   * Current theme
   */
  theme: 'light' | 'dark'

  /**
   * Current language
   */
  language: string
}
