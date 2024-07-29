/*******************************************************************************
 * render.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { ConfirmProvider } from 'material-ui-confirm'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

/** Project dependencies */
import { persistor, store } from '@/redux/store'

import { initI18next } from '@/locales/initI18next'

/** Package dependencies */
import { ConfigProvider } from './ConfigProvider'

export function render (page: JSX.Element): void {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
      <PersistGate persistor={persistor} onBeforeLift={initI18next}>
        <ConfigProvider>
          <ConfirmProvider>
            {page}
          </ConfirmProvider>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  )
}
