/*******************************************************************************
 * messaging.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { defineExtensionMessaging } from '@webext-core/messaging'

// Project dependencies
import { Quiz } from '@/models'

interface BadgeTheme {
  color: string
  bgcolor: string
}

interface ProtocolMap {
  // Popup -> Content
  getQuiz: () => Quiz

  // Content -> Background
  setBadgeValue: (value: number) => void
  setBadgeTheme: (theme: BadgeTheme) => void
  getMoodleVersion: (url: string) => string | undefined
  getImageAsBase64: (src: string) => string | undefined
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>()
