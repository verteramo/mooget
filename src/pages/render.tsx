import React from 'react'
import { createRoot } from 'react-dom/client'

export function render (page: JSX.Element): void {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      {page}
    </React.StrictMode>
  )
}
