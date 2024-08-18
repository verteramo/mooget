/*******************************************************************************
 * InputFile.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { ButtonBaseProps } from '@mui/material'
import React, { ChangeEvent, ReactElement, useRef } from 'react'

interface Props {
  accept?: string
  multiple?: boolean
  onChange: (list: FileList) => void
  children: ReactElement<ButtonBaseProps>
}

export function InputFile ({
  accept,
  multiple = false,
  onChange,
  children
}: Props): JSX.Element {
  const ref = useRef<HTMLInputElement>(null)

  function handleChange (event: ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files

    if (files !== null) {
      onChange(files)
      event.target.value = ''
    }
  }

  return (
    <>
      <input
        hidden
        ref={ref}
        type='file'
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />
      {React.cloneElement(children, { onClick: () => ref.current?.click() })}
    </>
  )
}
