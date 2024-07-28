/**
 * QuestionHandler.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { Question } from '@/core/dom/Question'
import { IQuestion } from '@/core/models/IQuestion'
import { Handler } from '@/core/utils/Handler'

/**
 * Question handler
 */
export type QuestionHandler = Handler<{
  element: JQuery<HTMLElement>
  question: Question
}, IQuestion>
