import { Question, QuestionType, Test } from '@/models'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { Box, Paper, Typography, MobileStepper, Button, FormControlLabel, Radio, RadioGroup, Stack, Divider, Checkbox } from '@mui/material'
import { useState } from 'react'

interface IProps {
  test: Test
}

function getAnswer (question: Question): JSX.Element {
  switch (question.type) {
    case QuestionType.Multichoice:{
      const isSingle = question.answer
        ?.filter((answer) => answer.correct).length === 1

      return (
        <Box key={question.id}>
          <RadioGroup name={question.id}>
            {question.answer?.map((answer, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={answer.content}
                  label={answer.content}
                  control={isSingle ? <Radio /> : <Checkbox />}
                />
              )
            })}
          </RadioGroup>
        </Box>
      )
    }

    case QuestionType.Text:{
      return (
        <input type='text' id='answer' name='answer' />
      )
    }

    default:
      return <></>
  }
}

export function Quiz ({ test }: IProps): JSX.Element {
  const questions = test.questions
  const length = questions.length
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
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size='small' onClick={handleBackClick} disabled={index === 0}>
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
        <Stack sx={{ p: 2 }} spacing={2}>
          <Typography align='justify'>{questions[index].content}</Typography>
          <Box>{getAnswer(questions[index])}</Box>
        </Stack>
      </Stack>
    </Paper>
  )
}
