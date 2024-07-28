/**
 * shuffle.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

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
