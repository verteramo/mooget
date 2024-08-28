/*******************************************************************************
 * colors.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

import { PaletteMode } from '@mui/material'
import { blue, green, grey, orange, purple, red } from '@mui/material/colors'

/**
 * Colors for the application palette
 */
export const Colors = {
  turtle: green[800],
  raphael: red[800],
  leonardo: blue[800],
  donatello: purple[800],
  michelangelo: orange[800]
}

export type Color = keyof typeof Colors

/**
 * Other colors used in the application
 */
export const UIColors = {
  light: '#F7F7F7',
  dark: '#242424',
  muted: grey[500]
}

export type UIColor = keyof typeof UIColors

/**
 * Get the preferred color mode
 *
 * @returns The preferred color mode
 */
export function getPreferredMode (): PaletteMode {
  return (
    window
      .matchMedia?.('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
  )
}
