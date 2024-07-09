/**
 * ThemeModeProvider
 * A provider component that provides a theme mode state
 * and a toggle button group to switch between light and dark mode.
 * The theme mode state is stored in Chrome storage,
 * is used to create a MUI theme,
 * and is used to set the initial value of the toggle button group.
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 */

import Box from '@mui/material/Box'
import createTheme from '@mui/material/styles/createTheme'
import CssBaseline from '@mui/material/CssBaseline'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'

import DarkMode from '@mui/icons-material/DarkMode'
import LightMode from '@mui/icons-material/LightMode'

import { ThemeProvider } from '@emotion/react'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import {
  IStore,
  setConfigLanguage,
  setConfigTheme,
  Theme
} from '@/redux'

export function ThemeModeProvider ({ children }: PropsWithChildren): JSX.Element {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const config = useSelector((store: IStore) => store.config)

  const [language, setLanguage] = useState<string>(i18n.language)

  const handleThemeClick = (mode: Theme) => () => {
    dispatch(setConfigTheme(mode))
  }

  const handleChangeLanguage = (event: SelectChangeEvent<string>): void => {
    setLanguage(event.target.value)
  }

  useEffect(() => {
    dispatch(setConfigLanguage(language))
    i18n.changeLanguage(language).catch(console.error)
  }, [language])

  return (
    <ThemeProvider theme={createTheme({ palette: { mode: config.theme } })}>
      <CssBaseline />
      <Box p={2} display='flex' justifyContent='space-between'>
        <Typography variant='h6'>{document.title}</Typography>
        <Stack direction='row' spacing={2}>
          <FormControl size='small' variant='filled' sx={{ width: 150 }}>
            <InputLabel id='demo-select-small-label'>
              {t('language')}
            </InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              label='Age'
              value={i18n.language}
              onChange={handleChangeLanguage}
            >
              {i18n.languages.map((language) => (
                <MenuItem key={language} value={language}>
                  {t(language)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ToggleButtonGroup
            exclusive
            size='small'
            value={config.theme}
            aria-label={t('theme')}
          >
            <ToggleButton
              value='light'
              title={t('light')}
              aria-label={t('light')}
              onClick={handleThemeClick('light')}
            >
              <LightMode />
            </ToggleButton>
            <ToggleButton
              value='dark'
              title={t('dark')}
              aria-label={t('dark')}
              onClick={handleThemeClick('dark')}
            >
              <DarkMode />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>
      <Box p={1}>{children}</Box>
    </ThemeProvider>
  )
}
