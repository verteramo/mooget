/** External dependencies */
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

/** Package dependencies */

/** Project dependencies */
import { RawContent } from '@/pages/common/RawContent'

interface Props {
  single: boolean
  contents: string[]
}

export function MultichoiceAnswer ({ single, contents }: Props): JSX.Element {
  const { t } = useTranslation()
  return (
    <FormControl>
      {single
        ? (
          <>
            <FormLabel>{t('choose-one')}</FormLabel>
            <RadioGroup>
              {contents.map((content, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    label={<RawContent content={content} />}
                    control={<Radio />}
                  />
                )
              })}
            </RadioGroup>
          </>
          )
        : (
          <>
            <FormLabel>{t('choose-one-or-more')}</FormLabel>
            <FormGroup>
              {contents.map((content, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    label={<RawContent content={content} />}
                    control={<Checkbox />}
                  />
                )
              })}
            </FormGroup>
          </>
          )}
    </FormControl>
  )
}
