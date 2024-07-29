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
 * { "content": "Answer 1", "correct": true, },
 * { "content": "Answer 2", "correct": false },
 * { "content": "Answer 4", "correct": false, "feedback": "Optional feedback" }
 * ```
 *
 * @example Match answers (in this case, correct is the match string):
 * ```json
 * { "content": "Answer 1", "correct": "Match 1" },
 * { "content": "Answer 2", "correct": "Match 2" },
 * { "content": "Answer 3", "correct": "Match 3", "feedback": "Optional feedback" }
 * ```
 */
export interface IAnswer {
  /**
   * HTML content
   */
  content: string

  /**
   * Correctness, if it can be determined
   */
  correct?: boolean | string

  /**
   * Feedback, if there is any
   */
  feedback?: string
}
