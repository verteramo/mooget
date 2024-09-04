import { initI18next } from '@/locales/initI18next.ts'
import React from 'react'
import ReactDOM from 'react-dom/client'

export function render (element: JSX.Element): void {
  initI18next().catch(console.error)

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      {element}
    </React.StrictMode>
  )
}
