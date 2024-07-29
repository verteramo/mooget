/*******************************************************************************
 * Middleware.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/**
 * Middleware to apply on output type properties
 *
 * @param T Output type
 */
export type Middleware<T> = {
  [P in keyof T]?: (value: T[P]) => T[P] | Promise<T[P]>
}

/**
 * Apply middlewares on output object properties
 *
 * @param object Output object
 * @param middlewares Middlewares to apply
 *
 * @returns Processed object
 */
export async function applyMiddlewares<T> (
  object: T,
  middlewares: Array<Middleware<T>>
): Promise<T> {
  for (const middleware of middlewares) {
    for (const property in middleware) {
      if (middleware[property] !== undefined) {
        object[property] = await middleware[property](object[property])
      }
    }
  }

  return object
}
