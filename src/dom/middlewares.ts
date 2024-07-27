import $ from 'jquery'

import { IQuestion, Middleware } from './quiz'

/**
 * Middleware to replace images src in HTML content
 */
const imagesQuestionMiddleware: Middleware<IQuestion> = {
  content: async (content) => {
    for (const img of $($.parseHTML(content)).find('img')) {
      content = content.replace(img.src, 'HOLA')
    }

    return content
  }
}

export const middlewares = [
  imagesQuestionMiddleware
]
