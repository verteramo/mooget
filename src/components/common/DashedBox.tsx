/*******************************************************************************
 * DashedBox.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'

// Project dependencies
import { UIColors } from '@/utils/colors'

interface Props extends PropsWithChildren {
  color?: string
}

/**
 * It provides a box with a dashed border to indicate that it is empty
 */
export function DashedBox ({ children, color = UIColors.muted }: Props): JSX.Element {
  return (
    <Box
      p={5}
      sx={{
        color,
        border: `5px dashed ${color}`,
        borderRadius: '5px',
        textAlign: 'center',
        alignContent: 'center'
      }}
      flexGrow={1}
    >
      {children}
    </Box>
  )
}
