/*******************************************************************************
 * Config.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { PaletteMode } from '@mui/material'

// Package dependencies
import { Color } from '../utilities/colors'

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
  color: Color

  /**
   * Current language
   */
  language: string

  /**
   * Reveal answers flag
   */
  visibility: boolean

  /**
   * Clipboard enabled flag
   */
  clipboard: boolean
}
