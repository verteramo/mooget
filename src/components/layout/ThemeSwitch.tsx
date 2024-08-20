/*******************************************************************************
 * ThemeSwitch.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependenciesº
import { DarkMode, LightMode } from '@mui/icons-material'
import { IconButton, PaletteMode } from '@mui/material'

interface Props {
  mode: PaletteMode
  onChange: (mode: PaletteMode) => void
  lightTitle?: string
  darkTitle?: string
}

export function ThemeModeSwitch ({
  mode,
  onChange,
  lightTitle,
  darkTitle
}: Props): JSX.Element {
  const isLightMode = mode === 'light'

  function handleChange (): void {
    onChange(isLightMode ? 'dark' : 'light')
  }

  return (
    <IconButton color='inherit' onClick={handleChange}>
      {isLightMode ? <DarkMode titleAccess={darkTitle} /> : <LightMode titleAccess={lightTitle} />}
    </IconButton>
  )
}
