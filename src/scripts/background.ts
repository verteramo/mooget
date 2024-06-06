/**
 * Acceso al almacenamiento de Chrome
 * Acceso al badge de la extensión
 */

import { Storage, Subject } from "../core/Constants"

export function setBadge(count: number): void {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.action.setBadgeText({
      tabId: tab.id,
      text: count.toString()
    })
  })
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.subject) {
    case Subject.GetTests:
      chrome.storage.sync.get([Storage.Tests], ({ tests }) => {
        sendResponse(tests)
      })
      break

    case Subject.GetVersion:
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (tab.url) {
          const url = new URL(tab.url)
          console.log(url)
          if (url.protocol === 'https:') {
            console.log(url)
            const data = fetch(`https://${url.host}/lib/upgrade.txt`).then(
              response => response.text() as Promise<string>
            )

            console.log(data)
          }
        }
        sendResponse(undefined)
      })

      break

    case Subject.SetBadge:
      if (message.count) {
        setBadge(message.count)
      }
      break
  }
})
