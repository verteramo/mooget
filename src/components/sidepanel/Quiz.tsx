import {
  Button,
  Divider,
  MobileStepper,
  Paper,
  Stack,
  Typography
} from '@mui/material'

import {
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@mui/icons-material'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IQuiz } from '@/dom'

import { Question } from './Question'

interface IProps {
  test: IQuiz
}

export function Quiz ({ test }: IProps): JSX.Element {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const { name, questions } = test
  const { length } = questions

  const handleClickNext = (): void => {
    setIndex((index) => index + 1)
  }

  const handleClickPrevious = (): void => {
    setIndex((index) => index - 1)
  }

  return (
    <Paper elevation={2}>
      <Stack divider={<Divider />}>
        <Typography sx={{ p: 2 }} variant='h6'>
          {name}
        </Typography>
        <MobileStepper
          variant='text'
          position='static'
          steps={length}
          activeStep={index}
          backButton={
            <Button
              size='small'
              disabled={index === 0}
              onClick={handleClickPrevious}
            >
              <KeyboardArrowLeft />
              {t('previous')}
            </Button>
          }
          nextButton={
            <Button
              size='small'
              disabled={index === length - 1}
              onClick={handleClickNext}
            >
              {t('next')}
              <KeyboardArrowRight />
            </Button>
          }
        />
        <Stack p={2}>
          <Question question={questions[index]} />
        </Stack>
      </Stack>
    </Paper>
  )
}
