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

// Package dependencies
import { generateTheme } from './generateTheme'
import { LanguageSelect } from './LanguageSelect'
import { PalettePopover } from './PalettePopover'

// Project dependencies
import { useConfigStore } from '@/core/stores'
import { DarkMode, LightMode } from '@mui/icons-material'

/**
 * Component that provides the layout for the application
 */
export function AppLayout ({
  children
}: PropsWithChildren): JSX.Element {
  const mode = useConfigStore((state) => state.mode)
  const color = useConfigStore((state) => state.color)
  const toggleMode = useConfigStore((state) => state.toggleMode)

  const theme = useMemo(
    () => generateTheme(mode, color),
    [mode, color]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='static' enableColorOnDark>
        <Toolbar disableGutters>
          <Stack direction='row' m={1} flexGrow={1}>
            <Stack direction='row' spacing={1} flexGrow={1} alignItems='center'>
              <Avatar variant='square' src='../../../assets/logo.png' />
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
        <Box marginTop={1}>{children}</Box>
      </Box>
    </ThemeProvider>
  )
}
