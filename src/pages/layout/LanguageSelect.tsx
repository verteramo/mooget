/*******************************************************************************
 * LanguageSelect.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { useConfigStore } from '@/core/stores'
import { Translate } from '@mui/icons-material'
import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { common } from '@mui/material/colors'
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
  const setLanguage = useConfigStore((state) => state.setLanguage)
  const { t, i18n: { language, languages } } = useTranslation()

  function handleChange (event: SelectChangeEvent<string>): void {
    setLanguage(event.target.value)
  }

  return (
    <FormControl>
      <Select
        sx={style}
        startAdornment={
          <InputAdornment position='start'>
            <Translate sx={{ color: common.white }} />
          </InputAdornment>
        }
        value={language}
        onChange={handleChange}
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
