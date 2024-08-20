/*******************************************************************************
 * messaging.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { defineExtensionMessaging } from '@webext-core/messaging'

// Project dependencies
import { Quiz } from '@/models'

interface ProtocolMap {
  getQuiz: () => Quiz
  setBadgeBackgroundColor: (color: string) => void
  setBadgeTextColor: (color: string) => void
  setBadgeText: (text: string) => void
  getMoodleVersion: (url: string) => string | undefined
  getImageAsBase64: (src: string) => string | undefined
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>()