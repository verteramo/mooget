/*******************************************************************************
 * qhDragAndDrop.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

import { QuestionReducerMap } from '@/core/parsing/QuestionReducer'

/** External dependencies */

/** Project dependencies */

/**
 * Drag and drop into text question type:
 * Missing words have to be dragged into gaps in a paragraph of text.
 * @see https://docs.moodle.org/en/Drag_and_drop_into_text_question_type
 */
export const DragAndDropQuestionReducer: QuestionReducerMap = {
  draganddrop: {
    answer: (parser) => [{
      value: 'DragAndDropQuestionReducer answer'
    }]
  }
}
