import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'

export function EmptyBox ({ children }: PropsWithChildren): JSX.Element {
  return (
    <Box
      sx={{
        p: 5,
        color: 'grey',
        border: '5px dashed grey',
        borderRadius: '5px',
        textAlign: 'center'
      }}
    >
      {children}
    </Box>
  )
}
