/**
 * ThemeModeProvider
 * Component that provides theme mode and language state
 * A select component to switch between languages
 * And a toggle button group to switch between light and dark mode
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 */

import {
  Avatar,
  Box,
  createTheme,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'

import {
  DarkMode,
  LightMode
} from '@mui/icons-material'

import {
  ThemeProvider
} from '@emotion/react'

import {
  PropsWithChildren,
  useEffect,
  useState
} from 'react'

import {
  useTranslation
} from 'react-i18next'

import {
  useDispatch,
  useSelector
} from 'react-redux'

import {
  IStore,
  setConfigLanguage,
  setConfigTheme,
  Theme
} from '@/redux'

export function ThemeModeProvider ({ children }: PropsWithChildren): JSX.Element {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const config = useSelector((store: IStore) => store.config)

  const [language, setLanguage] = useState<string>(i18n.language)

  const handleThemeChange = (mode: Theme) => () => {
    dispatch(setConfigTheme(mode))
  }

  const handleLanguageChange = (event: SelectChangeEvent<string>): void => {
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
        <Stack direction='row' spacing={2}>
          <Avatar
            variant='square'
            alt={document.title}
            src='../assets/logo_512.png'
          />
          <Typography variant='h4' fontWeight='bold'>
            {document.title}
          </Typography>
        </Stack>
        <Stack direction='row' spacing={2}>
          <FormControl size='small' variant='filled' sx={{ width: 150 }}>
            <InputLabel id='language-label'>{t('language')}</InputLabel>
            <Select
              labelId='language-label'
              id='language-select'
              label={t('language')}
              value={i18n.language}
              onChange={handleLanguageChange}
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
              onClick={handleThemeChange('light')}
            >
              <LightMode />
            </ToggleButton>
            <ToggleButton
              value='dark'
              title={t('dark')}
              aria-label={t('dark')}
              onClick={handleThemeChange('dark')}
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
