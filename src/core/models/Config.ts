/*******************************************************************************
 * IConfig.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

import { PaletteMode } from '@mui/material'

/**
 * Configuration interface
 */
export interface Config {
  /**
   * Current theme
   */
  mode: PaletteMode

  /**
   * Current primary color
   */
  primary: string

  /**
   * Current language
   */
  language: string
}
