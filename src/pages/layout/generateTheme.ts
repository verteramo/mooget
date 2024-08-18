/*******************************************************************************
 * generateTheme.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { Color } from '@/core/utilities/colors'
import { createTheme, PaletteMode, Theme } from '@mui/material'
import { common } from '@mui/material/colors'

export function generateTheme (mode: PaletteMode, color: string): Theme {
  return createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'light' ? Color.Light : Color.Dark
      },
      primary: {
        main: color,
        contrastText: common.white
      }
    },
    components: {
      MuiButton: {
        defaultProps: {
          size: 'small',
          variant: 'contained'
        }
      },
      MuiFormControl: {
        defaultProps: {
          size: 'small',
          margin: 'dense'
        }
      },
      MuiIconButton: {
        defaultProps: {
          size: 'small'
        }
      },
      MuiInputBase: {
        defaultProps: {
          margin: 'dense'
        }
      },
      MuiTextField: {
        defaultProps: {
          margin: 'dense'
        }
      },
      MuiToolbar: {
        defaultProps: {
          variant: 'dense'
        }
      },
      MuiCheckbox: {
        defaultProps: {
          size: 'small'
        }
      }
    }
  })
}
