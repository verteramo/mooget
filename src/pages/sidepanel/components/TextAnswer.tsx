/** External dependencies */
import { TextField } from '@mui/material'

/** Package dependencies */

/** Project dependencies */

interface Props {
  value: string
  onChange: (value: string) => void
}

export function TextAnswer ({ value, onChange }: Props): JSX.Element {
  return (
    <TextField
      fullWidth
      multiline
      variant='outlined'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
