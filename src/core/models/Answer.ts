/*******************************************************************************
 * IAnswer.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/**
 * Answers like multichoice or match, where there are multiple answers
 *
 * @example Multichoice answers (there could be multiple correct answers):
 * ```json
 * { "value": "Answer 1", "correct": true, },
 * { "value": "Answer 2", "correct": false },
 * { "value": "Answer 4", "correct": false, "feedback": "Optional feedback" }
 * ```
 *
 * @example Match answers (in this case, correct is the match string):
 * ```json
 * { "value": "Answer 1", "correct": "Match 1" },
 * { "value": "Answer 2", "correct": "Match 2" },
 * { "value": "Answer 3", "correct": "Match 3", "feedback": "Optional feedback" }
 * ```
 */
export interface Answer {
  /**
   * value
   */
  value: boolean | string

  /**
   * Correctness, if it can be determined
   */
  correct?: boolean | string

  /**
   * Feedback, if any
   */
  feedback?: string
}
