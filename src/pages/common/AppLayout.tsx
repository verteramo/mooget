/*******************************************************************************
 * ThemeModeProvider.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { ThemeProvider } from '@emotion/react'
import { ColorResult } from '@uiw/color-convert'
import Circle from '@uiw/react-color-circle'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import {
  AppBar,
  Avatar,
  Box,
  createTheme,
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Stack,
  Toolbar
} from '@mui/material'

import {
  DarkMode,
  LightMode,
  Palette,
  Translate
} from '@mui/icons-material'

/** Project dependencies */
import { Store } from '@/core/models/Store'

import {
  Colors,
  sliceConfigSetLanguage,
  sliceConfigSetMode,
  sliceConfigSetPrimary
} from '@/redux/sliceConfig'
import { common } from '@mui/material/colors'
import { selectStyles } from './AppLayoutProps'

/**
 * Component that provides editable theme mode, language and primary color
 */
export function AppLayout ({
  children
}: PropsWithChildren): JSX.Element {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const config = useSelector((store: Store) => store.config)

  const [language, setLanguage] = useState<string>(i18n.language)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handlePaletteOpen = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setAnchorEl(event.currentTarget)
  }

  const handlePaletteClose = (): void => {
    setAnchorEl(null)
  }

  const paletteOpened = Boolean(anchorEl)
  const paletteId = paletteOpened ? 'simple-popover' : undefined

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: config.mode,
        primary: {
          main: config.primary,
          contrastText: common.white
        }
      }
    })
  }, [config.mode, config.primary])

  const handlePaletteColorChange = ({ hex }: ColorResult): void => {
    dispatch(sliceConfigSetPrimary(hex))
    handlePaletteClose()
  }

  const handleThemeModeChange = (): void => {
    dispatch(sliceConfigSetMode(config.mode === 'light' ? 'dark' : 'light'))
  }

  const handleLanguageChange = (event: SelectChangeEvent<string>): void => {
    setLanguage(event.target.value)
  }

  useEffect(() => {
    dispatch(sliceConfigSetLanguage(language))
    i18n.changeLanguage(language).catch(console.error)
  }, [language])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='static' enableColorOnDark>
        <Toolbar disableGutters variant='dense'>
          <Stack direction='row' m={1} flexGrow={1}>
            <Stack direction='row' spacing={1} flexGrow={1}>
              <Avatar
                variant='square'
                alt={document.title}
                src='../assets/logo.png'
              />
            </Stack>
            <Stack direction='row' spacing={1}>
              <FormControl variant='outlined'>
                <Select
                  sx={selectStyles}
                  startAdornment={
                    <InputAdornment position='start'>
                      <Translate sx={{ color: 'white' }} />
                    </InputAdornment>
                    }
                  size='small'
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
              <IconButton
                size='small'
                color='inherit'
                onClick={handlePaletteOpen}
              >
                <Palette />
              </IconButton>
              <Popover
                id={paletteId}
                open={paletteOpened}
                anchorEl={anchorEl}
                onClose={handlePaletteClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <Circle
                  colors={Colors}
                  color={config.primary}
                  onChange={handlePaletteColorChange}
                  pointProps={{
                    style: {
                      marginLeft: 5,
                      marginTop: 5,
                      width: 32,
                      height: 32
                    }
                  }}
                />
              </Popover>
              <IconButton
                size='small'
                color='inherit'
                onClick={handleThemeModeChange}
              >
                {config.mode === 'light' ? <DarkMode /> : <LightMode />}
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
