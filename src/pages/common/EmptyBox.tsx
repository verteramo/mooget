/*******************************************************************************
 * EmptyBox.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  color?: string
}

/**
 * It provides a box with a dashed border to indicate that it is empty
 */
export function EmptyBox ({ children, color = 'grey' }: Props): JSX.Element {
  return (
    <Box
      sx={{
        p: 5,
        color,
        border: `5px dashed ${color}`,
        borderRadius: '5px',
        textAlign: 'center'
      }}
    >
      {children}
    </Box>
  )
}
