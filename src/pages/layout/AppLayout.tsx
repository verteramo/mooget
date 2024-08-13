/*******************************************************************************
 * AppLayout.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { ThemeProvider } from '@mui/material/styles'
import { PropsWithChildren, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'

/** Package dependencies */
import { LanguageSelect } from './LanguageSelect'
import { PalettePopover } from './PalettePopover'
import { generateTheme } from './generateTheme'

/** Project dependencies */
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  sliceConfigSetLanguage,
  sliceConfigSetMode,
  sliceConfigSetPrimary
} from '@/redux/sliceConfig'
import { ColorArray } from '@/utils/colors'
import { DarkMode, LightMode } from '@mui/icons-material'

/**
 * Component that provides the layout for the application
 */
export function AppLayout ({
  children
}: PropsWithChildren): JSX.Element {
  const dispatch = useAppDispatch()
  const { mode, primaryColor, language } = useAppSelector(store => store.config)
  const { t, i18n: { languages } } = useTranslation()
  const theme = useMemo(
    () => generateTheme(mode, primaryColor),
    [mode, primaryColor]
  )

  const handlePrimaryChange = (color: string): void => {
    dispatch(sliceConfigSetPrimary(color))
  }

  const handleLanguageChange = (language: string): void => {
    dispatch(sliceConfigSetLanguage(language))
  }

  const handleModeChange = (): void => {
    dispatch(sliceConfigSetMode(mode === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='static' enableColorOnDark>
        <Toolbar disableGutters>
          <Stack direction='row' m={1} flexGrow={1}>
            <Stack direction='row' spacing={1} flexGrow={1} alignItems='center'>
              <Avatar variant='square' src='../assets/logo.png' />
              <Typography variant='h6' fontWeight={400}>
                {document.title}
              </Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <LanguageSelect
                language={language}
                languages={languages.map((language) => [language, t(language)])}
                onChange={handleLanguageChange}
              />
              <PalettePopover
                color={primaryColor}
                colors={ColorArray}
                onChange={handlePrimaryChange}
              />
              <IconButton color='inherit' onClick={handleModeChange}>
                {mode === 'light' ? <DarkMode /> : <LightMode />}
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box m={1}>
        <Box marginTop={1}>{children}</Box>
      </Box>
    </ThemeProvider>
  )
}
