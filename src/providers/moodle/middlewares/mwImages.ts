/*******************************************************************************
 * mwImages.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import $ from 'jquery'

/** Project dependencies */
import { QuestionMiddleware } from '@/core/parsing/Question'
import { bgFetchImagesAsBase64 } from '@/scripts/background'

/**
 * Middleware to replace images src in HTML content
 */
export const mwImages: QuestionMiddleware = {
  content: async (content) => {
    return (await bgFetchImagesAsBase64($($.parseHTML(content)))).html()
  }
}
