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

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Quiz } from '@/core/models/Quiz'
import { IStore } from '@/redux/store'

import { Question } from '@/components/sidepanel/Question'
import { sliceProgressSetStep } from '@/redux/sliceProgress'
import { useDispatch, useSelector } from 'react-redux'

interface IProps {
  quiz: Quiz
}

export function Quiz ({ quiz: { name, questions } }: IProps): JSX.Element {
  const { t } = useTranslation()
  const [stateStep, setStateStep] = useState(0)
  const dispatch = useDispatch()
  const step = useSelector((store: IStore) => store.progress.step)
  const { length: steps } = questions

  useEffect(() => {
    dispatch(sliceProgressSetStep(stateStep))
  }, [stateStep])

  useEffect(() => {
    if (step !== undefined) {
      setStateStep(step)
    }
  }, [step])

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
          activeStep={stateStep}
          backButton={
            <Button
              size='small'
              disabled={stateStep === 0}
              onClick={() => setStateStep((step) => step - 1)}
            >
              <KeyboardArrowLeft />
              {t('back')}
            </Button>
          }
          nextButton={
            <Button
              size='small'
              disabled={stateStep === steps - 1}
              onClick={() => setStateStep((step) => step + 1)}
            >
              {t('next')}
              <KeyboardArrowRight />
            </Button>
          }
        />
        <Stack p={2}>
          <Question question={questions[stateStep]} />
        </Stack>
      </Stack>
    </Paper>
  )
}
