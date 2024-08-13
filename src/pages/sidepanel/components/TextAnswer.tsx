/** External dependencies */
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

/** Package dependencies */

/** Project dependencies */

interface Props {
  value: string
  onChange: (value: string) => void
}

export function TextAnswer ({ value, onChange }: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <TextField
      fullWidth
      multiline
      label={t('answer')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
