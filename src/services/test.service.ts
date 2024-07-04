import { DownloadableTest, Test, TestType, defaultTest } from '@/models'
import saveAs from 'file-saver'
import { Md5 } from 'ts-md5'
import { TestDOM } from './test.dom'

/**
 * Get a test from content if there is one
 * @returns Test
 */
export async function getTestFromContent (): Promise<Test | undefined> {
  const testDom = new TestDOM()

  if (testDom.type !== TestType.Unknown) {
    return {
      ...defaultTest,
      id: Md5.hashStr(testDom.name),
      name: testDom.name,
      category: testDom.category,
      type: testDom.type,
      home: testDom.home,
      link: testDom.link,
      // icon: await testDom.icon,
      version: await testDom.version,
      questions: await testDom.questions,
      favorite: false
    }
  }
}

function getDownlodableTest (test: Test): DownloadableTest {
  return {
    id: test.id,
    name: test.name,
    category: test.category,
    type: test.type,
    home: test.home,
    link: test.link,
    icon: test.icon,
    version: test.version,
    questions: test.questions
  }
}
export function downloadTest (test: Test): void {
  const json = JSON.stringify(getDownlodableTest(test))
  const type = 'application/json'

  saveAs(new Blob([json], { type }), `${test.name}.json`)
}

// function getPrintableTest (test: Test): PrintableTest {
//   return {
//     name: test.name,
//     category: test.category,
//     questions: test.questions
//   }
// }

// export function printTest (test: Test): void {
//   const printable = getPrintableTest(test)
//   const type = 'json'

//   printJS({
//     type,
//     printable,
//     header: test.name
//   })
// }
