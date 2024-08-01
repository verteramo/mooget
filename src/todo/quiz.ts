/**
 * Quiz parsing module
 *
 * @see https://docs.moodle.org/en/Question_types
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { isRight } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { Md5 } from 'ts-md5'

import { Question } from '@/core/models/Question'
import { Quiz } from '@/core/models/Quiz'
import { QuizType } from '@/core/providers/moodle/QuizType'

/****************************************************
 * Input codecs
 ****************************************************/

/**
 * Input answer codec;
 * It is used to validate uploaded quizzes
 */
const InputAnswerCodec = t.intersection([
  t.type({
    content: t.string
  }),
  t.partial({
    correct: t.union([t.boolean, t.string]),
    feedback: t.string
  })
])

/**
 * Input question codec;
 * It is used to validate uploaded quizzes
 */
const InputQuestionCodec = t.intersection([
  t.type({
    // ID is not required because it can be generated from the name
    content: t.string
  }),
  t.partial({
    feedback: t.string,
    answer: t.union([t.boolean, t.string, t.array(InputAnswerCodec)])
  })
])

/**
 * Input quiz codec;
 * It is used to validate uploaded quizzes
 */
const InputQuizCodec = t.intersection([
  t.type({
    // ID is not required because it can be generated from the name
    name: t.string,
    category: t.string,
    questions: t.array(InputQuestionCodec)
  }),
  t.partial({
    favorite: t.boolean,
    type: t.keyof(QuizType),
    url: t.string,
    home: t.string,
    icon: t.string,
    version: t.string
  })
])

export function convertQuiz (data: unknown): Quiz | undefined {
  console.log('convertQuiz 1', data)
  const result = InputQuizCodec.decode(data)
  console.log('convertQuiz 2', result)

  if (isRight(result)) {
    const quiz: Quiz = {
      id: Md5.hashStr(result.right.name),
      name: result.right.name,
      category: result.right.category,
      questions: result.right.questions.map((currentQuestion) => {
        const question: Question = {
          id: Md5.hashStr(currentQuestion.content),
          type: 'multichoice',
          content: currentQuestion.content,
          feedback: currentQuestion.feedback,
          answer: currentQuestion.answer
        }

        return question
      })
    }

    return quiz
  }

  throw new Error('Invalid quiz')
}
