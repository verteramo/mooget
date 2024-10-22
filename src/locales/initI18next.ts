/*******************************************************************************
 * initI18next.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Package dependencies
import en from './en.json'
import es from './es.json'

// Project dependencies
import { useConfigStore } from '@/stores/useConfigStore'

/**
 * Initialize the i18next library with the resources and configuration.
 */
export async function initI18next (): Promise<void> {
  if (!i18n.isInitialized) {
    await i18n
      .use(initReactI18next)
      .init({
        // debug: true,
        resources: {
          en: { translation: en },
          es: { translation: es }
        },
        fallbackLng: ['en', 'es'],
        lng: 'en',
        interpolation: {
          escapeValue: false
        }
      })
  }
}

useConfigStore.subscribe(({ language }) => language, (language) => {
  if (i18n.isInitialized) {
    i18n.changeLanguage(language).catch(console.error)
  }
}, { fireImmediately: true })
