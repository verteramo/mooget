/** Package dependencies */
import { ReactNode } from 'react'

/** Project dependencies */
import { QuestionType } from '@/core/models'

type Props = {
  type: QuestionType
} & {
  [key in QuestionType]?: ReactNode
}

export function QuestionAnswer (props: Props): ReactNode {
  return props[props.type] ?? <></>
}
