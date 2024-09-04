import { AnswerType } from '@/models'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  type: AnswerType
} & {
  [key in AnswerType]?: ReactNode;
}

export function AnswerComponent (props: Props): ReactNode {
  const { t } = useTranslation()
  return props[props.type] ?? <>{t('undefined-answer-type')}</>
}
