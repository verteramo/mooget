import { IStore, store, updateFromStorage } from '@/redux'

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    let newState: IStore
    const root = changes['persist:root']?.newValue

    if (root === undefined) {
      newState = { tests: [] }
    } else {
      const data: { tests: string } = JSON.parse(root)
      newState = { tests: JSON.parse(data.tests) }
    }

    store.dispatch(updateFromStorage(newState))
  }
})
