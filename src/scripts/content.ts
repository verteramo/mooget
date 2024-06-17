/**
 * Content script
 *
 * - DOM access
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import { Subject } from '../core/Utils'
import { Analyzer, Question, Test } from '../core/Analyzer'

function filterNewQuestions (test: Test): Question[] {
  const newQuestions: Question[] = []
  chrome.storage.local.get('tests', ({ tests }) => {
    for (const currentTest of tests as Test[]) {
      if (currentTest.id === test.id) {
        for (const question of test.questions) {
          if (
            !currentTest.questions.some(
              (currentQuestion) => currentQuestion.html === question.html
            )
          ) {
            newQuestions.push(question)
          }
        }
        break
      }
    }
  })

  return newQuestions
}

const analyzer = new Analyzer()

// Instantiate Analyzer and get context
analyzer.getContext().then((context) => {
  // Listen for messages
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    switch (message.subject) {
      // Send context to popup
      case Subject.GetContext:
        sendResponse(context)
        break

      // Send test to popup
      case Subject.GetTest:
        sendResponse(context.test)
        break
    }
  })

  switch (context.type) {
    // Attempt page
    // Answer questions in DOM
    case 'page-mod-quiz-attempt':{
      console.log('Attempt page')
      chrome.storage.local.get('tests', (data) => {
        const tests = data.tests as Test[]
        for (const test of tests) {
          if (test.id === context.test?.id) {
            analyzer.answerTest(test)
          }
        }
      })
      break
    }

    case 'page-mod-quiz-review':{
      console.log('Review page')
      console.log(context)
      // Get new questions
      let test = context.test as Test
      test = {
        ...test,
        questions: filterNewQuestions(test)
      }
      // Send new questions to background to set badge
      chrome.runtime.sendMessage({
        subject: Subject.SetBadge,
        count: test.questions.length
      }).catch(console.error)
      break
    }
  }
}).catch(console.error)
