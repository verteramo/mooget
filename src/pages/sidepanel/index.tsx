/** External dependencies */
import { Close } from '@mui/icons-material'
import { useConfirm } from 'material-ui-confirm'
import { useTranslation } from 'react-i18next'

import {
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@mui/material'

/** Package dependencies */
import { DashedBox } from '../common/DashedBox'
import { Html } from '../common/Html'
import { render } from '../layout/render'
import { MatchingAnswer } from './components/MatchingAnswer'
import { MultichoiceAnswer } from './components/MultichoiceAnswer'
import { QuestionAnswer } from './components/QuestionAnswer'
import { QuizStepper } from './components/QuizStepper'
import { TextAnswer } from './components/TextAnswer'
import { TrueFalseAnswer } from './components/TrueFalseAnswer'

/** Project dependencies */
import { useQuizCollectionStore, useProgressStore } from '@/core/stores'

function SidePanel (): JSX.Element {
  const { t } = useTranslation()
  const quizId = useProgressStore(({ quizId }) => quizId)
  const quiz = useQuizCollectionStore(({ items }) => items.find(({ id }) => id === quizId))

  if (quiz === undefined) {
    return <DashedBox>{t('empty-quiz')}</DashedBox>
  }

  const confirm = useConfirm()

  const step = useProgressStore(({ step }) => step)
  const answers = useProgressStore(({ answers }) => answers)
  const setQuiz = useProgressStore(({ setQuiz }) => setQuiz)
  const setStep = useProgressStore(({ setStep }) => setStep)
  const setAnswer = useProgressStore(({ setAnswer }) => setAnswer)

  const answer = answers[step]
  const question = quiz.questions[answer.index]

  const isMultichoiceSingle =
    question.answers?.filter(({ match }) => match === true).length === 1

  const choices =
    question.answers?.map(({ value }) => value) as string[]

  const handleCloseClick = (): void => {
    confirm({
      title: t('close'),
      description: quiz.name
    }).then(() => setQuiz('')).catch(console.error)
  }

  const handleBackClick = (): void => {
    setStep(step - 1)
  }

  const handleNextClick = (): void => {
    setStep(step + 1)
  }

  const handleFinished = (): void => {
    console.log('finished')
  }

  const handleTextAnswerChange = (value: string): void => {
    setAnswer({ ...answer, answer: [value] })
  }

  const handleMultichoiceAnswerChange = (value: boolean[]): void => {
    setAnswer({ ...answer, answer: value })
  }

  return (
    <Paper elevation={2}>
      <Stack divider={<Divider variant='middle' />}>
        <Stack direction='row' p={2}>
          <Typography variant='h6' flexGrow={1}>
            {quiz.name}
          </Typography>
          <IconButton
            title={t('close')}
            onClick={handleCloseClick}
          >
            <Close />
          </IconButton>
        </Stack>
        <Stack p={2} spacing={2}>
          <QuizStepper
            steps={quiz.questions.length}
            current={step}
            onFinished={handleFinished}
            onBackClick={handleBackClick}
            onNextClick={handleNextClick}
          />
          <Typography align='justify'>
            <Html content={question.content} />
          </Typography>
          <QuestionAnswer
            type={question.type}
            text={
              <TextAnswer
                value={answer.answer?.[0] as string}
                onChange={handleTextAnswerChange}
              />
            }
            multichoice={
              <MultichoiceAnswer
                single={isMultichoiceSingle}
                choices={choices.map((content, index) => ({
                  content,
                  checked: answer.answer?.[index] as boolean
                }))}
                onChange={handleMultichoiceAnswerChange}
              />
            }
            truefalse={
              <TrueFalseAnswer
                value={answer.answer?.[0] as boolean | undefined}
                onChange={handleMultichoiceAnswerChange}
              />
            }
            matching={
              <MatchingAnswer
                choices={choices.map((content, index) => ({
                  value: content,
                  correct: question.answers?.[index].match as string
                }))}
              />
            }
          />
        </Stack>
      </Stack>
    </Paper>
  )
}

render(<SidePanel />)
