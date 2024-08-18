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
import { useConfigStore } from '../stores'
import en from './en.json'
import es from './es.json'

/**
 * Initialize the i18next library with the resources and configuration.
 */
export async function initI18next (): Promise<void> {
  if (!i18n.isInitialized) {
    await i18n
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: en },
          es: { translation: es }
        },
        lng: useConfigStore.getState().language,
        fallbackLng: ['en', 'es'],
        debug: true,
        interpolation: {
          escapeValue: false
        }
      })
  }
}
