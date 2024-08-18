/*******************************************************************************
 * PalettePopover.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { Check, Palette } from '@mui/icons-material'
import { alpha, Box, IconButton, Popover, Stack } from '@mui/material'
import { MouseEvent, useState } from 'react'

// Project dependencies
import { useConfigStore } from '@/core/stores'
import { Color, PaletteColor } from '@/core/utilities/colors'
import { common } from '@mui/material/colors'

export function PalettePopover (): JSX.Element {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)
  const opened = anchor !== null
  const id = opened ? 'simple-popover' : undefined
  const colors = Object.values(PaletteColor)
  const selectedColor = useConfigStore((state) => state.color)

  const setColor = useConfigStore((state) => state.setColor)

  function getColorName (color: Color): string | undefined {
    return Object.keys(Color).find((key) => Color[key as keyof typeof Color] === color)
  }

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
          {colors.map((color) => (
            <Box
              component={IconButton}
              key={color}
              bgcolor={color}
              width={30}
              height={30}
              title={getColorName(color)}
              sx={{
                borderRadius: 0.5,
                ...(color === selectedColor && {
                  bgcolor: alpha(color, 0.75)
                }),
                '&:hover': {
                  bgcolor: alpha(color, 0.75)
                }
              }}
              onClick={() => handleColorChange(color)}
            >
              {color === selectedColor && <Check sx={{ color: common.white }} />}
            </Box>
          ))}
        </Stack>
      </Popover>
    </>
  )
}
