import { useTranslation } from 'react-i18next'
import { MultichoiceAnswer } from './MultichoiceAnswer'

interface Props {
  value: boolean | undefined
  onChange: (value: boolean[]) => void
}

export function TrueFalseAnswer ({ value, onChange }: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <MultichoiceAnswer
      single
      choices={[
        { content: t('true'), checked: value === true },
        { content: t('false'), checked: value === false }
      ]}
      onChange={(value) => onChange(value)}
    />
  )
}
