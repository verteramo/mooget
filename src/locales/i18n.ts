import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Translations
import en from './en.json'
import es from './es.json'

import { store } from '@/redux'

// Initialize i18next
export async function initI18next (): Promise<void> {
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
