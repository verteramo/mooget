/**
 * QuestionMiddleware.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { IQuestion } from '@/core/models/IQuestion'
import { Middleware } from '@/core/utils/Middleware'

/**
 * Question middleware
 */
export type QuestionMiddleware = Middleware<IQuestion>
