import { Question } from '.'

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
  name: string
  category: string
  type: TestType
  home: string
  link: string
  version: string
  questions: Question[]
}

export const defaultTest: Test = {
  id: '',
  name: '',
  category: '',
  type: TestType.Unknown,
  home: '',
  link: '',
  version: '',
  questions: []
}
