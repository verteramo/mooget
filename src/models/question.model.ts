import { Answer } from '@/models'

export enum QuestionType {
  Unknown,
  Description,
  MultipleChoice,
  Matching,
  Text,
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
}
