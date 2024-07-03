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

import { ThemeProvider } from '@emotion/react'
import { DarkMode, LightMode } from '@mui/icons-material'
import { Box, CssBaseline, ToggleButton, ToggleButtonGroup, Typography, createTheme } from '@mui/material'
import { PropsWithChildren } from 'react'
import { createChromeStorageStateHookSync } from 'use-chrome-storage'

type Mode = 'light' | 'dark'

const useThemeModeStore = createChromeStorageStateHookSync<Mode>('theme', 'light')

export function ThemeModeProvider ({ children }: PropsWithChildren): JSX.Element {
  const [mode, setMode] = useThemeModeStore()

  return (
    <ThemeProvider theme={createTheme({ palette: { mode } })}>
      <CssBaseline />
      <Box p={1} display='flex' justifyContent='space-between'>
        <Typography variant='h6'>{document.title}</Typography>
        <ToggleButtonGroup
          exclusive
          size='small'
          value={mode}
          aria-label='Theme mode'
        >
          <ToggleButton
            value='light'
            aria-label='Light'
            onClick={() => setMode('light')}
          >
            <LightMode />
          </ToggleButton>
          <ToggleButton
            value='dark'
            aria-label='Dark'
            onClick={() => setMode('dark')}
          >
            <DarkMode />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box p={1}>
        {children}
      </Box>
    </ThemeProvider>
  )
}
