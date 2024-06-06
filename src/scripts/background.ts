/**
 * Acceso al almacenamiento de Chrome
 * Acceso al badge de la extensión
 */

import { Subject, Storage } from "../core/Constants"

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.subject) {
    case Subject.GetTheme:
      chrome.storage.sync.get([Storage.Theme], data => sendResponse(data.theme))
      break

    case Subject.SetTheme:
      chrome.storage.sync.set({ theme: message.theme }, () => sendResponse(message.theme))
      break

    case Subject.GetTests:
      chrome.storage.sync.get([Storage.Tests], data => sendResponse(data.tests))
      break

    case Subject.SetBadge:
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        chrome.action.setBadgeText({
          tabId: tab.id,
          text: message.count.toString()
        })
      })
      break
  }
})
