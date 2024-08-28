/*******************************************************************************
 * MultichoiceAnswer.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { ReactNode } from 'react'

import { Html } from '@/components/common/Html'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  single: boolean

  choices: Array<{
    content: string
    checked: boolean
  }>

  onChange: (value: boolean[]) => void
}

function useComponents (single: boolean): [
  (props: any) => JSX.Element,
  (props: any) => ReactNode,
  string
] {
  return single
    ? [RadioGroup, Radio, 'choose-one']
    : [FormGroup, Checkbox, 'choose-one-or-more']
}

export function MultichoiceAnswer ({ single, choices, onChange }: Props): JSX.Element {
  const { t } = useTranslation()

  const [Group, Control, label] = useComponents(single)

  return (
    <FormControl>
      <FormLabel>{t(label)}:</FormLabel>
      <Group>
        {choices.map(({ content, checked }, index) => {
          return (
            <FormControlLabel
              key={index}
              label={<Html content={content} />}
              control={
                <Control
                  checked={checked}
                  onChange={() => {
                    onChange(
                      choices.map((choice, i) => {
                        return (
                          single
                            ? i === index
                            : choice.checked
                        )
                      })
                    )
                  }}
                />
              }
            />
          )
        })}
      </Group>
    </FormControl>
  )
}
