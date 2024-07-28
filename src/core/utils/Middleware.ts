/**
 * Middleware.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

/**
 * Middleware to apply on output type properties
 *
 * @param T Output type
 */
export type Middleware<T> = {
  [P in keyof T]?: (value: T[P]) => T[P] | Promise<T[P]>
}
