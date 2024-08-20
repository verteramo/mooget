/*******************************************************************************
 * native.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/**
 * Get an object with null/undefined values removed
 *
 * Weak null check is valid for undefined too
 *
 * @param props Props
 * @returns Conditional props
 */
export function partial<T> (props: { [key: string]: any }): Partial<T> {
  return Object.entries(props).reduce<Partial<T>>((object, [key, value]) => {
    if (value != null) {
      object[key as keyof T] = value
    }

    return object
  }, {})
}

/**
 * Shuffle array; makes a copy
 *
 * @param array Array
 * @returns Shuffled array
 */
export function shuffle<T> (array: T[]): T[] {
  const copy = [...array]

  for (let current = copy.length - 1; current > 0; current--) {
    const random = Math.floor(Math.random() * (current + 1));
    [copy[current], copy[random]] = [copy[random], copy[current]]
  }

  return copy
}