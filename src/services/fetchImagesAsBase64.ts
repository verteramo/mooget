/**
 * fetchImagesAsBase64.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { fetchImageAsBase64 } from '@/services/fetchImageAsBase64'

/**
 * Replace images src with base64 in JQuery HTML element
 *
 * @param element JQuery HTML element
 * @returns Same JQuery HTML element with images as base64
 */
export async function fetchImagesAsBase64 (
  element: JQuery<HTMLElement> | JQuery<JQuery.Node[]>
): Promise<JQuery<HTMLElement> | JQuery<JQuery.Node[]>> {
  for (const img of element.find('img')) {
    if (img.src.startsWith('http')) {
      const base64Image = await fetchImageAsBase64(img.src)

      if (base64Image !== undefined) {
        img.src = base64Image
      }
    }
  }

  return element
}
