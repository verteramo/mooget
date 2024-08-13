/*******************************************************************************
 * initI18next.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

/** Package dependencies */
import en from './en.json'
import es from './es.json'

import { store } from '@/redux/store'

// Initialize i18next
export async function initI18next (): Promise<void> {
  if (!i18n.isInitialized) {
    await i18n
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: en },
          es: { translation: es }
        },
        lng: store.getState().config.language,
        fallbackLng: ['en', 'es'],
        debug: true,
        interpolation: {
          escapeValue: false
        }
      })
  }
}
