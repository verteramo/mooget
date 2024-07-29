import { Raw } from '@/components'
import { IAnswer, IQuestion } from '@/dom'

import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material'

interface IProps {
  question: IQuestion
}

export function Multichoice ({ question }: IProps): JSX.Element {
  const answer = question.answer as IAnswer[]
  const isSingle = answer.filter(({ correct }) => correct === true).length === 1

  return (
    <Box>
      <Raw content={question.content as string} />
      <RadioGroup name={question.id}>
        {answer.map((answer, index) => {
          const content = <Raw content={answer.content} />
          return (
            <FormControlLabel
              key={index}
              value={content}
              label={content}
              control={isSingle ? <Radio /> : <Checkbox />}
            />
          )
        })}
      </RadioGroup>
    </Box>
  )
}
