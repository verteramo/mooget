/*******************************************************************************
 * LanguageSelect.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { Language } from '@mui/icons-material'
import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { common } from '@mui/material/colors'

// Project dependencies
import { useConfigStore } from '@/stores'
import { useTranslation } from 'react-i18next'

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

export function LanguageSelect (): JSX.Element {
  const { t, i18n: { languages } } = useTranslation()

  const [language, setLanguage] = useConfigStore((state) => [
    state.language,
    state.setLanguage
  ])

  function handleChange (event: SelectChangeEvent<string>): void {
    setLanguage(event.target.value)
  }

  return (
    <FormControl>
      <Select
        sx={style}
        value={language}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position='start'>
            <Language sx={{ color: common.white }} />
          </InputAdornment>
        }
      >
        {languages.map((language) => (
          <MenuItem key={language} value={language}>
            {t(language)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
