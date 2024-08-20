/*******************************************************************************
 * MoodleProvider.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// Package dependencies
import { MoodleQuestionParser } from './MoodleQuestionParser'
import { MoodleQuestionReducerMap } from './MoodleQuestionReducerMap'
import { MoodleQuizParser } from './MoodleQuizParser'

// Project dependencies
import { Provider } from '@/parsing'

export const moodleProvider: Provider = {
  QuizParser: MoodleQuizParser,
  QuestionParser: MoodleQuestionParser,
  QuizResolver: undefined as any,
  reducers: MoodleQuestionReducerMap
}
