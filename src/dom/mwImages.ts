/**
 * mwImages.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import $ from 'jquery'

import { QuestionMiddleware } from '@/core/dom/QuestionMiddleware'
import { bgFetchImagesAsBase64 } from '@/scripts/background'

/**
 * Middleware to replace images src in HTML content
 */
export const mwImages: QuestionMiddleware = {
  content: async (content) => {
    return (await bgFetchImagesAsBase64($($.parseHTML(content)))).html()
  }
}
