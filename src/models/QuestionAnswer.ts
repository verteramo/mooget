/*******************************************************************************
 * QuestionAnswer.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/**
 * It can represent a single answer or a set of answers:
 *
 * @example Single answers:
 * ```json
 * { "value": true },
 * { "value": "Answer text" },
 * ```
 *
 * @example Multichoice answers (match could be a boolean
 * ```json
 * { "value": "Answer 1", "match": true, },
 * { "value": "Answer 2", "match": false },
 * { "value": "Answer 4", "match": false, "feedback": "Optional feedback" }
 * ```
 *
 * @example Match answers (in this case, match is a string):
 * ```json
 * { "value": "Answer 1", "match": "Match 1" },
 * { "value": "Answer 2", "match": "Match 2" },
 * { "value": "Answer 3", "match": "Match 3", "feedback": "Optional feedback" }
 * ```
 */
export interface QuestionAnswer {
  /**
   * Value
   */
  value: string | boolean

  /**
   * Match value, if any
   */
  match?: string | boolean

  /**
   * Feedback, if any
   */
  feedback?: string
}
