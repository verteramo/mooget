import { Raw } from '@/components'
import { IAnswer, IQuestion } from '@/dom'

import {
  Box,
  TextField
} from '@mui/material'

interface IProps {
  question: IQuestion
}

export function Multianswer ({ question }: IProps): JSX.Element {
  const answer = question.answer as IAnswer[]

  return (
    <Box>
      {answer.map(({ content, correct, options }, index) => {
        return (
          <Box key={index}>
            <Raw content={content} />
            {options === undefined
              ? (
                <TextField variant='outlined' />
                )
              : (
                <TextField
                  select
                  SelectProps={{
                    native: true
                  }}
                  variant='outlined'
                >
                  {options.map((option, index) => {
                    return (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    )
                  })}
                </TextField>

                )}
          </Box>
        )
      })}
    </Box>
  )
}
