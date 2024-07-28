import { ConfirmProvider } from 'material-ui-confirm'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/redux/store'

import { initI18next } from '@/locales/initI18next'

import { ThemeModeProvider } from '@/components/common/ThemeModeProvider'

export function render (page: JSX.Element): void {
  console.log('render')
  createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
      <PersistGate persistor={persistor} onBeforeLift={initI18next}>
        <ThemeModeProvider>
          <ConfirmProvider>
            {page}
          </ConfirmProvider>
        </ThemeModeProvider>
      </PersistGate>
    </Provider>
  )
}
