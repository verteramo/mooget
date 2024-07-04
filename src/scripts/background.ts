import { fetchVersion, replaceImages } from '@/services'
import { getMessage } from '@extend-chrome/messages'

// Messages
const [setBadge, setBadgeObserver] = getMessage<string>('setBadge')
const [disablePopup, disablePopupObserver] = getMessage<undefined>('disablePopup')
const [getVersion, getVersionObserver] = getMessage<string, string>('getVersion', { async: true })
const [getImages, getImagesObserver] = getMessage<JQuery<HTMLElement>, string>('replaceImages', { async: true })

// Set badge observer
setBadgeObserver.subscribe(([text]) => {
  console.log('setBadgeObserver')
  chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
    chrome.action.setBadgeText({ text, tabId: tab.id }).then(() => {

    }).catch((error) => {
      console.log('chrome.action.setBadgeText error', error)
    })
  }).catch((error) => {
    console.log('chrome.tabs.query error', error)
  })
})

// Disable popup observer
disablePopupObserver.subscribe(() => {
  console.log('disablePopupObserver')
  chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
    chrome.action.disable(tab.id).catch((error) => {
      console.log('chrome.action.disable error', error)
    })
  }).catch((error) => {
    console.log('chrome.tabs.query error', error)
  })
})

// Get version observer
getVersionObserver.subscribe(([url,,sendResponse]) => {
  console.log('getVersionObserver')
  fetchVersion(url).then(sendResponse).catch((error) => {
    console.log('fetchVersion error', error)
  })
})

// Get images observer
getImagesObserver.subscribe(([element,,sendResponse]) => {
  console.log('getImageObserver')
  replaceImages(element).then(sendResponse).catch((error) => {
    console.log('replaceImages error', error)
  })
})

export { setBadge, disablePopup, getVersion, getImages }
