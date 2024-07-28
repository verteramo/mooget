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
  IconButton,
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
  GitHub,
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

import { IConfig } from '@/core/models/IConfig'
import { IStore } from '@/core/models/IStore'

import { sliceConfigSetLanguage, sliceConfigSetTheme } from '@/redux/sliceConfig'

export function ThemeModeProvider ({ children }: PropsWithChildren): JSX.Element {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const config = useSelector((store: IStore) => store.config)

  const [language, setLanguage] = useState<string>(i18n.language)

  const handleThemeChange = (mode: IConfig['theme']) => () => {
    dispatch(sliceConfigSetTheme(mode))
  }

  const handleLanguageChange = (event: SelectChangeEvent<string>): void => {
    setLanguage(event.target.value)
  }

  useEffect(() => {
    dispatch(sliceConfigSetLanguage(language))
    i18n.changeLanguage(language).catch(console.error)
  }, [language])

  const theme = createTheme({
    palette: {
      mode: config.theme
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box m={1}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Stack direction='row' spacing={1}>
            <Avatar
              variant='square'
              alt={document.title}
              src='../assets/logo_512.png'
            />
            <Typography variant='h4' fontWeight='bold'>
              {document.title}
            </Typography>
          </Stack>
          <Stack direction='row' spacing={1}>
            <IconButton
              color='primary'
              title='GitHub'
              href='http://github.com/verteramo/mooget'
              target='_blank' rel='noreferrer'
            >
              <GitHub />
            </IconButton>
            <FormControl size='small' sx={{ width: 150 }}>
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
        </Stack>
        <Box marginTop={1}>{children}</Box>
      </Box>
    </ThemeProvider>
  )
}
