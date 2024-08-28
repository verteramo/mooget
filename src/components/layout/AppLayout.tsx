/*******************************************************************************
 * AppLayout.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { ThemeProvider } from '@mui/material/styles'
import { PropsWithChildren, useMemo } from 'react'

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

import {
  DarkMode,
  LightMode
} from '@mui/icons-material'

// Package dependencies
import { generateTheme } from './generateTheme'
import { LanguageSelect } from './LanguageSelect'
import { PalettePopover } from './PalettePopover'

// Project dependencies
import { useConfigStore } from '@/stores'

/**
 * Component that provides the layout for the application
 */
export function AppLayout ({
  children
}: PropsWithChildren): JSX.Element {
  const [mode, color, toggleMode] = useConfigStore(
    (state) => [state.mode, state.color, state.toggleMode]
  )

  const colorKey = color as keyof typeof Colors

  const theme = useMemo(
    () => generateTheme(mode, Colors[colorKey]), [mode, color]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='static' enableColorOnDark>
        <Toolbar disableGutters>
          <Stack direction='row' m={1} flexGrow={1}>
            <Stack
              direction='row'
              spacing={1}
              flexGrow={1}
              alignItems='center'
            >
              <Avatar variant='square' src='icon/128.png' />
              <Typography variant='h6' fontWeight='bold'>
                {document.title}
              </Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <LanguageSelect />
              <PalettePopover />
              <IconButton color='inherit' onClick={toggleMode}>
                {mode === 'light' ? <DarkMode /> : <LightMode />}
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box m={1}>
        <Box>{children}</Box>
      </Box>
    </ThemeProvider>
  )
}
