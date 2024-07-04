import { Question } from '.'

export enum TestType {
  Unknown = 'unknown',
  Attempt = 'page-mod-quiz-attempt',
  Review = 'page-mod-quiz-review',
}

/**
 * Test interface
 * @property {string} id Test ID
 * @property {string} name Test name
 * @property {string} category Test category
 * @property {TestType} type Test type
 * @property {string} home Test home
 * @property {string} icon Test icon
 * @property {string} link Test link
 * @property {string} version Test version
 * @property {Question[]} questions Test questions
 * @property {boolean} favorite Test favorite
 */
export interface Test {
  id: string
  name: string
  category: string
  type: TestType
  home: string
  link: string
  icon: string
  version: string
  questions: Question[]
  favorite: boolean
}

export interface DownloadableTest {
  id: string
  name: string
  category: string
  type: TestType
  home: string
  link: string
  icon: string
  version: string
  questions: Question[]
}

export interface PrintableTest {
  name: string
  category: string
  questions: Question[]
}

export const defaultTest: Test = {
  id: '',
  name: '',
  category: '',
  type: TestType.Unknown,
  home: '',
  link: '',
  icon: '',
  version: '',
  questions: [],
  favorite: false
}
