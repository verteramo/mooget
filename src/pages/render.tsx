import { ThemeModeProvider } from '@/components'
import { initI18next } from '@/locales/i18n'
import { persistor, store } from '@/redux'
import { ConfirmProvider } from 'material-ui-confirm'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import '@/redux/store.listener'

export function render (page: JSX.Element): void {
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
