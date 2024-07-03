// import { updateFromStorage } from '@/redux'
// import { store } from './store'

// chrome.storage.onChanged.addListener((changes, areaName) => {
//   console.log('Storage changed:', changes)
//   if (
//     areaName === 'local' &&
//     changes.reduxPersistedState !== undefined &&
//     changes.reduxPersistedState.newValue !== undefined &&
//     Array.isArray(changes.reduxPersistedState.newValue.tests)
//   ) {
//     const newPersistedState = changes.reduxPersistedState.newValue
//     store.dispatch(updateFromStorage({ tests: newPersistedState.tests }))
//   }
// })
