import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MobileStepper from '@mui/material/MobileStepper'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ITest } from '@/dom'

import { Answer, Raw } from '@/components'
import { shuffle } from '@/scripts/utilities'

interface IProps {
  test: ITest
}

export function Quiz ({ test }: IProps): JSX.Element {
  const { t } = useTranslation()
  const questions = shuffle(test?.questions)
  const length = questions?.length
  const [index, setIndex] = useState(0)

  const handleNextClick = (): void => {
    setIndex((index) => index + 1)
  }

  const handleBackClick = (): void => {
    setIndex((index) => index - 1)
  }

  return (
    <Paper elevation={2}>
      <Stack divider={<Divider />}>
        <Typography sx={{ p: 2 }} variant='h6'>{test.name}</Typography>
        <MobileStepper
          variant='text'
          position='static'
          steps={length}
          activeStep={index}
          nextButton={
            <Button
              size='small'
              onClick={handleNextClick}
              disabled={index === length - 1}
            >
              {t('next')}
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size='small' onClick={handleBackClick} disabled={index === 0}>
              <KeyboardArrowLeft />
              {t('previous')}
            </Button>
          }
        />
        <Stack sx={{ p: 2 }} spacing={2}>
          <Typography align='justify'>
            <Raw content={questions[index].content} />
          </Typography>
          <Box><Answer question={questions[index]} /></Box>
        </Stack>
      </Stack>
    </Paper>
  )
}
