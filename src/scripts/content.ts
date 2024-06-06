/**
 * Acceso al DOM de la página
 */

import { load } from 'cheerio'
import { Test } from '../core/Models'
import { Subject } from '../core/Constants'

const itest = new Test(load(document.body.innerHTML)).getITest()

chrome.runtime.sendMessage({
  subject: Subject.SetBadge,
  count: itest.questions.length
})

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.subject) {
    case Subject.GetTest:
      sendResponse(itest.title ? itest : undefined)
      break
  }
})
