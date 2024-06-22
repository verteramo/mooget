import { Question } from '@/models'

export enum TestType {
  Unknown,
  Attempt,
  Review,
}

/**
 * Test interface
 * @property type Test type
 * @property home Site URL
 * @property link Quiz URL
 * @property name Quiz name
 * @property version Site version
 * @property questions Questions
 */
export interface Test {
  id: string
  category: string
  type: TestType
  home: string
  link: string
  version: string
  questions: Question[]
}
