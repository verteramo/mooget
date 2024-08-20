/*******************************************************************************
 * QuestionAnswer.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { ReactNode } from "react";

// Project dependencies
import { QuestionType } from "@/models";

type Props = {
  type: QuestionType;
} & {
  [key in QuestionType]?: ReactNode;
};

export function QuestionAnswer(props: Props): ReactNode {
  return props[props.type] ?? <></>;
}
