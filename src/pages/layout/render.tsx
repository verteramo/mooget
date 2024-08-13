/*******************************************************************************
 * render.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { ConfirmProvider } from 'material-ui-confirm'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

/**
 * Project dependencies
 * Store must be imported before AppLayout
 */
import { initI18next } from '@/locales/initI18next'
import { persistor, store } from '@/redux/store'

/** Package dependencies */
import { AppLayout } from './AppLayout'

export function render (page: JSX.Element): void {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor} onBeforeLift={initI18next}>
          <AppLayout>
            <ConfirmProvider>{page}</ConfirmProvider>
          </AppLayout>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  )
}
