/*******************************************************************************
 * ThemeModeProvider.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { ThemeProvider } from '@emotion/react'
import { DarkMode, GitHub, LightMode, Palette } from '@mui/icons-material'
import { ColorResult } from '@uiw/color-convert'
import Circle from '@uiw/react-color-circle'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import {
  Avatar,
  Box,
  Button,
  createTheme,
  CssBaseline,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Stack
} from '@mui/material'

/** Project dependencies */
import { IStore } from '@/core/models/IStore'

import {
  Colors,
  sliceConfigSetLanguage,
  sliceConfigSetMode,
  sliceConfigSetPrimary
} from '@/redux/sliceConfig'

/**
 * Component that provides editable theme mode, language and primary color
 */
export function ConfigProvider ({
  children
}: PropsWithChildren): JSX.Element {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const config = useSelector((store: IStore) => store.config)

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
          main: config.primary
        }
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              minWidth: 38,
              minHeight: 38,
              boxShadow: 'none'
            }
          }
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
              src='../assets/logo.png'
            />
          </Stack>
          <Stack direction='row' spacing={1}>
            <IconButton
              size='small'
              title='GitHub'
              href='http://github.com/verteramo/mooget'
              target='_blank'
              rel='noreferrer'
            >
              <GitHub />
            </IconButton>
            <FormControl sx={{ width: 150 }}>
              <InputLabel id='language-label'>{t('language')}</InputLabel>
              <Select
                size='small'
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
            <Button
              size='small'
              variant='contained'
              onClick={handlePaletteOpen}
            >
              <Palette color='action' />
            </Button>
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
            <Button size='small' variant='outlined' onClick={handleThemeModeChange}>
              {config.mode === 'light'
                ? (
                  <DarkMode color='action' />
                  )
                : (
                  <LightMode color='action' />
                  )}
            </Button>
          </Stack>
        </Stack>
        <Box marginTop={1}>{children}</Box>
      </Box>
    </ThemeProvider>
  )
}
