/**
 * Popup script
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Main } from '../components/Main'

import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <StrictMode>
    <Main />
  </StrictMode>
)
