import { Provider } from '@/core/parsing'
import { MoodleQuestionParser } from './MoodleQuestionParser'
import { MoodleQuestionReducerMap } from './MoodleQuestionReducerMap'
import { MoodleQuizParser } from './MoodleQuizParser'

export const moodleProvider: Provider = {
  QuizParser: MoodleQuizParser,
  QuestionParser: MoodleQuestionParser,
  QuizResolver: undefined as any,
  reducers: MoodleQuestionReducerMap
}
