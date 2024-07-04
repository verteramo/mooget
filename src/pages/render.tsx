import { ThemeModeProvider } from '@/providers'
import { persistor, store } from '@/redux'
import { ConfirmProvider } from 'material-ui-confirm'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export function render (children: JSX.Element): void {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeModeProvider>
          <ConfirmProvider>
            {children}
          </ConfirmProvider>
        </ThemeModeProvider>
      </PersistGate>
    </Provider>
  )
}
