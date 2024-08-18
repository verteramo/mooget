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

/** Package dependencies */
import { AppLayout } from './AppLayout'
import { initI18next } from '@/core/locales/initI18next'

export function render (page: JSX.Element): void {
  initI18next().catch(console.error)
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <AppLayout>
        <ConfirmProvider>{page}</ConfirmProvider>
      </AppLayout>
    </React.StrictMode>
  )
}
