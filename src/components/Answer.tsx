import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { IQuestion, QuestionType } from '@/dom'

import { Raw } from '@/components'

interface IProps {
  question: IQuestion
}

export function Answer ({ question }: IProps): JSX.Element {
  switch (question.type) {
    case QuestionType.Multichoice: {
      const isSingle =
        question.answer?.filter((answer) => answer.correct).length === 1

      return (
        <Box key={question.id}>
          <RadioGroup name={question.id}>
            {question.answer?.map((answer, index) => {
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

    case QuestionType.Text: {
      return <input type='text' id='answer' name='answer' />
    }

    default:{
      return <></>
    }
  }
}
