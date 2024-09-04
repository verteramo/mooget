import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'

interface Props {
  value: string
  onAnswer: (answer: string) => void
}

export function TextAnswer ({ value, onAnswer }: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <Input
      placeholder={t('answer')}
      value={value}
      onChange={({ target: { value } }) => onAnswer(value)}
    />
  )
}
