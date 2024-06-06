/**
 * Acceso al DOM de la página
 */

import { load } from 'cheerio'
import { Subject } from "../core/Constants"
import { Test } from '../core/Models'

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.subject) {
    case Subject.GetTest:
      sendResponse(new Test(load(document.body.innerHTML)))
      break
  }
})

