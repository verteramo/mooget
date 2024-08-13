/*******************************************************************************
 * PalettePopover.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { Palette } from '@mui/icons-material'
import { IconButton, Popover } from '@mui/material'
import { ColorResult } from '@uiw/color-convert'
import Circle from '@uiw/react-color-circle'
import { MouseEvent, useState } from 'react'

interface Props {
  color: string
  colors: string[]
  onChange: (color: string) => void
  title?: string
}

export function PalettePopover ({
  color,
  colors,
  onChange,
  title
}: Props): JSX.Element {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)
  const opened = anchor !== null
  const id = opened ? 'simple-popover' : undefined

  function handleOpen ({ currentTarget }: MouseEvent<HTMLButtonElement>): void {
    setAnchor(currentTarget)
  }

  function handleClose (): void {
    setAnchor(null)
  }

  function handleColorChange ({ hex }: ColorResult): void {
    setAnchor(null)
    onChange(hex)
  }

  return (
    <>
      <IconButton color='inherit' title={title} onClick={handleOpen}>
        <Palette />
      </IconButton>
      <Popover
        id={id}
        open={opened}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Circle
          colors={colors}
          color={color}
          onChange={handleColorChange}
          pointProps={{
            style: {
              marginLeft: 5,
              marginTop: 5,
              width: 32,
              height: 32
            }
          }}
        />
      </Popover>
    </>
  )
}
