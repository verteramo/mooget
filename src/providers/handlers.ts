/*******************************************************************************
 * handlers.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** Package dependencies */
import { qhDragAndDrop } from './moodle/handlers/qhDragAndDrop'
import { qhMatch } from './moodle/handlers/qhMatch'
import { qhMultianswer } from './moodle/handlers/qhMultianswer'
import { qhMultichoice } from './moodle/handlers/qhMultichoice'
import { qhText } from './moodle/handlers/qhText'
import { qhTrueFalse } from './moodle/handlers/qhTrueFalse'

export default [
  qhDragAndDrop,
  qhMatch,
  qhMultianswer,
  qhMultichoice,
  qhText,
  qhTrueFalse
]
