/*******************************************************************************
 * PalettePopover.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { Check, Palette } from '@mui/icons-material'
import { alpha, Box, IconButton, Popover, Stack } from '@mui/material'
import { common } from '@mui/material/colors'
import { MouseEvent, useState } from 'react'

// Project dependencies
import { useConfigStore } from '@/stores'
import { Color, Colors } from '@/utils/colors'
import { toTitleCase } from '@/utils/native'

export function PalettePopover (): JSX.Element {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)
  const opened = anchor !== null
  const id = opened ? 'simple-popover' : undefined

  const [color, setColor] = useConfigStore((state) => [
    state.color,
    state.setColor
  ])

  function handleOpen ({ currentTarget }: MouseEvent<HTMLButtonElement>): void {
    setAnchor(currentTarget)
  }

  function handleClose (): void {
    setAnchor(null)
  }

  function handleColorChange (color: Color): void {
    setAnchor(null)
    setColor(color)
  }

  return (
    <>
      <IconButton color='inherit' onClick={handleOpen}>
        <Palette />
      </IconButton>
      <Popover
        id={id}
        open={opened}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <Stack direction='row' p={0.5} spacing={0.5}>
          {Object.entries(Colors).map(([name, value]) => (
            <Box
              component={IconButton}
              key={name}
              title={toTitleCase(name)}
              bgcolor={value}
              width={30}
              height={30}
              sx={{
                borderRadius: 0.5,
                ...(name === color && {
                  bgcolor: alpha(value, 0.75)
                }),
                '&:hover': {
                  bgcolor: alpha(value, 0.75)
                }
              }}
              onClick={() => handleColorChange(name as Color)}
            >
              {name === color && <Check sx={{ color: common.white }} />}
            </Box>
          ))}
        </Stack>
      </Popover>
    </>
  )
}
