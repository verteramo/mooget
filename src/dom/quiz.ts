/**
 * Quiz parsing module
 *
 * @see https://docs.moodle.org/en/Question_types
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import * as t from 'io-ts'
import $ from 'jquery'
import { Md5 } from 'ts-md5'

import { getVersion } from '@/scripts/background'
import { optional } from '@/scripts/utilities'
import { isRight } from 'fp-ts/lib/Either'

/**
 * Answers like multichoice or match, where there are multiple answers
 *
 * @example
 * Multichoice answers (there could be multiple correct answers):
 * ```json
 * { "content": "Answer 1", "correct": true, },
 * { "content": "Answer 2", "correct": false },
 * { "content": "Answer 4", "correct": false, "feedback": "Optional feedback" }
 * ```
 *
 * @example
 * Match answers (in this case, correct is the match):
 * ```json
 * { "content": "Answer 1", "correct": "Match 1" },
 * { "content": "Answer 2", "correct": "Match 2" },
 * { "content": "Answer 3", "correct": "Match 3", "feedback": "Optional feedback" }
 * ```
 */
export interface IAnswer {
  /**
   * HTML content
   */
  content: string

  /**
   * Correctness, if it can be determined
   */
  correct?: boolean | string

  /**
   * Feedback, if there is any
   */
  feedback?: string
}

/**
 * Question interface
 */
export interface IQuestion {
  /**
   * MD5 hash of the div.formulation element text;
   * HTML could be different because of the image URLs between sites
   */
  id: string

  /**
   * Second class of the div.que element
   */
  type: string

  /**
   * HTML content of the div.qtext element
   */
  content: string

  /**
   * HTML content of the div.rightanswer element
   */
  feedback?: string

  /**
   * Answer, if it can be determined;
   * it could be a boolean, a string or an array of IAnswer if there are multiple answers
   */
  answer?: boolean | string | Iterable<IAnswer>
}

/**
 * Extracts information from the DOM div.que element
 */
export class Question {
  /**
   * JQuery div.que element
   */
  private readonly $element: JQuery<HTMLElement>

  /**
   * @param $element JQuery div.que element
   */
  constructor ($element: JQuery<HTMLElement>) {
    this.$element = $element
  }

  /**
   * Second class of the div.que element
   */
  get type (): string | undefined {
    return this.$element.attr('class')?.split(/\s+/)[1]
  }

  /**
   * HTML content of the div.qtext element
   */
  get content (): string | undefined {
    return this.$element.find('div.qtext').html()?.trim()
  }

  /**
   * Second part of the div.rightanswer text (split by ': ')
   */
  get rightanswer (): string | undefined {
    return this.$element.find('div.rightanswer').text().split(/:\s/, 2)[1]
  }

  /**
   * HTML content of the div.generalfeedback element
   */
  get feedback (): string | undefined {
    return this.$element.find('div.generalfeedback').html()
  }

  /**
   * Correctness, if it can be determined
   */
  get correct (): boolean | undefined {
    // By classes
    if (this.$element.hasClass('correct')) {
      return true
    }

    if (this.$element.hasClass('incorrect')) {
      return false
    }

    // By grades
    // If it has not been determined by classes, checks the grades
    // If the question has 2 grades, the second one is the max grade, so compares them
    // Grades can have format like 1.00 or 1,00 (in some languages)
    const grades = this.$element.find('div.grade').text().match(/\d+[.,]\d+/g)

    if (grades?.length === 2) {
      return grades[0] === grades[1]
    }

    // By state
    // Checks if the state starts with 'correct' or 'incorrect'
    const state = this.$element.find('div.state').text().toLowerCase()

    if (state.startsWith('correct')) {
      return true
    }

    if (state.startsWith('incorrect')) {
      return false
    }
  }
}

/**
 * Maps each property of the output type to a
 * function that receives the JQuery element and question,
 * which is intended to reduce the question to the output type
 */
type QuestionReducer<OutputType> = {
  [Property in keyof OutputType]?: (
    $e: JQuery<HTMLElement>,
    question: Question
  ) => OutputType[Property] | Promise<OutputType[Property]>
}

/**
 * Maps question types to a reducer;
 * handlers are applied during question parsing
 * @example
 * ```ts
 * const questionHandler: QuestionHandler<SomeType> = {
 *   types: ['question_type', ...],
 *   reducer: {
 *     some_property: ($e, question) => {
 *       // Do something with the element and question
 *     },
 *     ...
 *   }
 * }
 * ```
 */
export interface QuestionHandler<OutputType> {
  /**
   * Types of questions that this handler can reduce
   */
  types: string[]

  /**
   * Reducer to map the question to the output type
   */
  reducer: QuestionReducer<OutputType>
}

/**
 * Reduce a question to an output type
 * @param type Question type
 * @param handlers Question handlers
 * @param element Question element
 * @param question Question instance
 * @returns Partial output type
 */
export async function reduceQuestion<OutputType> (
  type: string,
  handlers: Array<QuestionHandler<OutputType>>,
  element: JQuery<HTMLElement>,
  question: Question
): Promise<Partial<OutputType>> {
  const result: Partial<OutputType> = {}

  // Find the reducer for the question type
  const questionReducer = handlers.find(
    (handler) => handler.types.includes(type)
  )?.reducer

  // If there is a reducer, reduce the question
  if (questionReducer !== undefined) {
    for (const property in questionReducer) {
      const propertyReducer = questionReducer[property]
      if (propertyReducer !== undefined) {
        result[property] = await propertyReducer(element, question)
      }
    }
  }

  return result
}

/**
 * Middleware to apply to output type properties;
 * it is intended to modify the output type after the question has been reduced
 */
export type Middleware<OutputType> = {
  [Property in keyof OutputType]?: (
    value: OutputType[Property]
  ) => OutputType[Property] | Promise<OutputType[Property]>
}

/**
 * Apply middlewares to the output type
 * @param question Question
 * @param middlewares Middlewares to apply
 * @returns Modified output type
 */
export async function applyMiddlewares<OutputType> (
  question: OutputType,
  middlewares: Array<Middleware<OutputType>>
): Promise<OutputType> {
  for (const middleware of middlewares) {
    for (const property in middleware) {
      const propertyMiddleware = middleware[property]
      if (propertyMiddleware !== undefined) {
        question[property] = await propertyMiddleware(question[property])
      }
    }
  }

  return question
}

/**
 * Quiz type
 *
 * It is the body ID
 */
export enum QuizType {
  Review = 'page-mod-quiz-review',
  Attempt = 'page-mod-quiz-attempt'
}

/**
 * Quiz interface
 *
 * It is the quiz data
 */
export interface IQuiz {
  /**
   * MD5 hash of the quiz name
   */
  id: string

  /**
   * Name
   */
  name: string

  /**
   * Category
   */
  category: string

  /**
   * Questions
   */
  questions: IQuestion[]

  /**
   * Favorite status
   */
  favorite?: boolean

  /**
   * Body ID
   */
  type?: QuizType

  /**
   * URL with the attempt parameter
   */
  url?: string

  /**
   * Site home
   */
  home?: string

  /**
   * Site icon
   */
  icon?: string

  /**
   * Site brand
   */
  brand?: string

  /**
   * Site version
   */
  version?: string
}

/**
 * DOM quiz extractor
 */
export class Quiz {
  /**
   * Last breadcrumb-item
   */
  get name (): string | undefined {
    const text = $('li.breadcrumb-item').last().text().replace(/\s+/g, ' ').trim()

    if (text.length > 0) {
      return text
    }
  }

  /**
   * First breadcrumb-item with title
   */
  get category (): string | undefined {
    const text = $('li.breadcrumb-item a[title]').first().attr('title')?.replace(/\s+/g, ' ').trim()

    if (text !== undefined && text.length > 0) {
      return text
    }
  }

  /**
   * Body ID
   */
  get type (): QuizType | undefined {
    switch (document.body.id) {
      case QuizType.Review:
        return QuizType.Review

      case QuizType.Attempt:
        return QuizType.Attempt
    }
  }

  /**
   * First link that starts with http and contains /mod/quiz;
   * the only required parameter is 'attempt'
   *
   * @example
   * 'https://site.com/mod/quiz/attempt.php?attempt=123'
   *
   * @link https://github.com/moodle/moodle/blob/main/mod/quiz/review.php
   * @link https://github.com/moodle/moodle/blob/main/mod/quiz/attempt.php
   */
  get url (): string | undefined {
    const href = $('a[href^="http"][href*="/mod/quiz"][href*="attempt="]').attr('href')?.trim()

    if (href !== undefined) {
      const { origin, pathname, searchParams } = new URL(href)
      const attempt = searchParams.get('attempt')

      if (attempt !== null) {
        return `${origin}${pathname}?attempt=${attempt}`
      }
    }
  }

  /**
   * Base URL of the site;
   * could be a subdirectory like 'site.com/path/to/moodle'
   */
  get home (): string | undefined {
    return this.url?.replace(/\/mod\/quiz.*/, '')
  }

  /**
   * Navbar brand img src
   */
  get icon (): string | undefined {
    const icon = $('link[rel="shortcut icon"]').attr('href')

    if (icon?.endsWith('/favicon') === false) {
      if (icon.startsWith('http')) {
        return icon
      }

      if (icon.startsWith('/') && this.home !== undefined) {
        return this.home + icon
      }
    }

    return $('a.navbar-brand img').attr('src')
  }

  /**
   * Navbar brand img alt
   */
  get brand (): string | undefined {
    return (
      $('a.navbar-brand img').attr('alt') ??
      $('a.navbar-brand').text().trim()
    )
  }

  /**
   * It comes from the /lib/upgrade.txt endpoint
   * Its format includes major, minor, and optionally patch value (x.x.x)
   */
  get version (): Promise<string | undefined> | undefined {
    const home = this.home

    if (home !== undefined) {
      return getVersion(home)
    }
  }

  /**
   * Questions
   */
  async * questions (handlers: Array<QuestionHandler<IQuestion>> = []): AsyncIterable<IQuestion> {
    // Loop through questions
    for (const element of $('div.que')) {
      const $element = $(element)
      const question = new Question($element)

      if ( // Mandatory properties
        question.type !== undefined &&
        question.content !== undefined
      ) {
        yield {
          id: Md5.hashStr(question.content),
          type: question.type,
          content: question.content,
          ...optional<IQuestion>({
            feedback: question.feedback,
            ...await reduceQuestion(question.type, handlers, $element, question)
          })
        }
      }
    }
  }

  /**
   * Get quiz from the DOM
   */
  static async extract (
    handlers: Array<QuestionHandler<IQuestion>> = [],
    middlewares: Array<Middleware<IQuestion>> = []
  ): Promise<IQuiz | undefined> {
    const quiz = new Quiz()

    if ( // Mandatory properties
      quiz.type !== undefined &&
      quiz.name !== undefined &&
      quiz.category !== undefined
    ) {
      const questions: IQuestion[] = []

      for await (const question of quiz.questions(handlers)) {
        questions.push(await applyMiddlewares(question, middlewares))
      }

      return {
        id: Md5.hashStr(quiz.name + quiz.category),
        name: quiz.name,
        category: quiz.category,
        questions,
        ...optional<IQuiz>({
          type: quiz.type,
          url: quiz.url,
          home: quiz.home,
          icon: quiz.icon,
          brand: quiz.brand,
          version: await quiz.version
        })
      }
    }
  }
}

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

export function convertQuiz (data: unknown): IQuiz | undefined {
  console.log('convertQuiz 1', data)
  const result = InputQuizCodec.decode(data)
  console.log('convertQuiz 2', result)

  if (isRight(result)) {
    const quiz: IQuiz = {
      id: Md5.hashStr(result.right.name),
      name: result.right.name,
      category: result.right.category,
      questions: result.right.questions.map((currentQuestion) => {
        const question: IQuestion = {
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
