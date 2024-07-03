import { Test, TestType } from '@/models'
import { TestDOM } from './test.dom'

export async function getTestsFromStorage (): Promise<Test[]> {
  return await chrome.storage.local.get('tests').then(({ tests }) => tests)
}

export async function getTestFromContent (): Promise<Test | undefined> {
  const testDom = new TestDOM()

  if (testDom.type !== TestType.Unknown) {
    return {
      id: testDom.id,
      name: testDom.id,
      category: testDom.category,
      type: testDom.type,
      home: testDom.home,
      link: testDom.link,
      version: await testDom.version,
      questions: await testDom.questions
    }
  }
}

export async function filterUniqueQuestions (test: Test): Promise<Test> {
  const tests = await getTestsFromStorage()

  return {
    ...test,
    questions: test.questions.filter(question => {
      return !tests.some(({ questions }) => {
        return questions.some(({ id }) => id === question.id)
      })
    })
  }
}
