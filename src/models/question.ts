import { Answer } from '.'

export enum QuestionType {
  Unknown = 'unknown',
  Description = 'description',
  Multichoice = 'multichoice',
  Match = 'match',
  Text = 'text',
}

/**
 * Question interface
 * @property id Question ID
 * @property html Question HTML
 * @property answer Question answer
 */
export interface Question {
  id: string
  content: string
  answer?: Answer[]
  type: QuestionType
}
