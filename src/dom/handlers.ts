/**
 * handlers.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 */

import { qhDragAndDrop } from '@/dom/qhDragAndDrop'
import { qhMatch } from '@/dom/qhMatch'
import { qhMultianswer } from '@/dom/qhMultianswer'
import { qhMultichoice } from '@/dom/qhMultichoice'
import { qhText } from '@/dom/qhText'
import { qhTrueFalse } from '@/dom/qhTrueFalse'

export const handlers = [
  qhDragAndDrop,
  qhMatch,
  qhMultianswer,
  qhMultichoice,
  qhText,
  qhTrueFalse
]
