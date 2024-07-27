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

import { QuizInfo } from '@/dom'

import { Question } from './Question'

interface IProps {
  quiz: QuizInfo
}

export function Quiz ({ quiz: { name, questions } }: IProps): JSX.Element {
  const { t } = useTranslation()
  const [step, setStep] = useState(0)
  const { length: steps } = questions

  return (
    <Paper elevation={2}>
      <Stack divider={<Divider variant='middle' />}>
        <Typography sx={{ p: 2 }} variant='h6'>
          {name}
        </Typography>
        <MobileStepper
          variant='text'
          position='static'
          steps={steps}
          activeStep={step}
          backButton={
            <Button
              size='small'
              disabled={step === 0}
              onClick={() => setStep((step) => step - 1)}
            >
              <KeyboardArrowLeft />
              {t('back')}
            </Button>
          }
          nextButton={
            <Button
              size='small'
              disabled={step === steps - 1}
              onClick={() => setStep((step) => step + 1)}
            >
              {t('next')}
              <KeyboardArrowRight />
            </Button>
          }
        />
        <Stack p={2}>
          <Question question={questions[step]} />
        </Stack>
      </Stack>
    </Paper>
  )
}
