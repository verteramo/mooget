/*******************************************************************************
 * Config.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { PaletteMode } from '@mui/material'

// Package dependencies
import { Palette } from '@/utilities/colors'

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
  color: Palette

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
