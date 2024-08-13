/*******************************************************************************
 * LanguageSelect.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { Translate } from '@mui/icons-material'
import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { common } from '@mui/material/colors'

/**
 * Styles
 */
const style = {
  '& .MuiSelect-select': {
    color: common.white
  },
  '& .MuiSelect-icon': {
    color: common.white
  },
  '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgb(255, 255, 255, 0.10)'
  },
  '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgb(255, 255, 255, 0.30)'
  },
  '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgb(255, 255, 255, 0.50)'
  }
}

interface Props {
  language: string
  languages: Array<[string, string]>
  onChange: (language: string) => void
  title?: string
}

export function LanguageSelect ({
  language,
  languages,
  onChange,
  title
}: Props): JSX.Element {
  function handleChange ({
    target: { value }
  }: SelectChangeEvent<string>): void {
    onChange(value)
  }

  return (
    <FormControl>
      <Select
        title={title}
        sx={style}
        startAdornment={
          <InputAdornment position='start'>
            <Translate sx={{ color: common.white }} />
          </InputAdornment>
        }
        value={language}
        onChange={handleChange}
      >
        {languages.map(([key, name]) => (
          <MenuItem key={key} value={key}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
