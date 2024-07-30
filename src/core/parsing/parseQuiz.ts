/*******************************************************************************
 * content.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Package dependencies */
import { IQuestion } from '../models/IQuestion'
import { IQuiz } from '../models/IQuiz'
import { QuestionParserConstructor } from './Question'
import { QuizConstructorTuple, QuizProvider } from './Quiz'

function getProviderTuple (tuples: QuizConstructorTuple[]): [QuizProvider, QuestionParserConstructor] | undefined {
  for (const [Constructor, questionParserConstructor] of tuples) {
    const quizProviderInstance = new Constructor()

    if (
      quizProviderInstance.name !== undefined &&
      quizProviderInstance.category !== undefined &&
      quizProviderInstance.questions !== undefined
    ) {
      return [quizProviderInstance, questionParserConstructor]
    }
  }
}

/**
 * Get quiz from the DOM
 */
export async function parseQuiz (tuples: QuizConstructorTuple[]): Promise<IQuiz | undefined> {
  const providerTuple = getProviderTuple(tuples)

  if (providerTuple !== undefined) {
    console.log('providerTuple', providerTuple)
    const [quizProviderInstance, questionParserConstructor] = providerTuple

    if (
      quizProviderInstance?.name !== undefined &&
      quizProviderInstance?.category !== undefined &&
      quizProviderInstance?.questions !== undefined
    ) {
      const questions: IQuestion[] = []

      for await (const question of quizProviderInstance.genQuestions(questionParserConstructor)) {
        questions.push(question)
      }

      if (questions.length > 0) {
        const { name, category } = quizProviderInstance

        return {
          name,
          category,
          questions,
          url: quizProviderInstance.url,
          home: quizProviderInstance.home,
          icon: quizProviderInstance.icon,
          type: quizProviderInstance.type,
          owner: quizProviderInstance.owner,
          version: await quizProviderInstance.version,
          id: quizProviderInstance.hash(name + category)
        }
      }
    }
  }
}
