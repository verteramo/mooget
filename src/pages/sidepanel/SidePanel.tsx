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
import { EmptyBox } from '../common/EmptyBox'
import { PurifiedHtml } from '../common/PurifiedHtml'
import { render } from '../layout/render'
import { MultichoiceAnswer } from './components/MultichoiceAnswer'
import { QuestionAnswer } from './components/QuestionAnswer'
import { QuizStepper } from './components/QuizStepper'
import { TextAnswer } from './components/TextAnswer'

/** Project dependencies */
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { sliceProgressSetAnswer, sliceProgressSetQuiz, sliceProgressSetStep } from '@/redux/sliceProgress'
import { MatchingAnswer } from './components/MatchingAnswer'
import { TrueFalseAnswer } from './components/TrueFalseAnswer'

function SidePanel (): JSX.Element {
  const { t } = useTranslation()
  const confirm = useConfirm()
  const dispatch = useAppDispatch()
  const { quiz: quizId, step, answers } = useAppSelector(store => store.progress)
  const quizzes = useAppSelector(store => store.quizzes)
  const quiz = quizzes.find(({ id }) => id === quizId)

  if (quiz === undefined) {
    return <EmptyBox>{t('empty-quiz')}</EmptyBox>
  }

  const handleCloseClick = (): void => {
    confirm({
      title: t('close'),
      description: quiz.name
    }).then(() => {
      dispatch(sliceProgressSetQuiz(''))
    }).catch(console.error)
  }

  const handleBackClick = (): void => {
    dispatch(sliceProgressSetStep(step - 1))
  }

  const handleNextClick = (): void => {
    dispatch(sliceProgressSetStep(step + 1))
  }

  const handleFinished = (): void => {
    console.log('finished')
  }

  const currentAnswer = answers[step]
  const currentQuestion = quiz.questions[currentAnswer.index]

  const handleTextAnswerChange = (value: string): void => {
    dispatch(sliceProgressSetAnswer({
      ...currentAnswer,
      answer: [value]
    }))
  }

  const isMultichoiceSingle =
    currentQuestion.answer?.filter(({ correct }) => correct === true).length === 1

  const choices =
    currentQuestion.answer?.map(({ value }) => value) as string[]

  const handleMultichoiceAnswerChange = (value: boolean[]): void => {
    dispatch(sliceProgressSetAnswer({ ...currentAnswer, answer: value }))
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
            <PurifiedHtml content={currentQuestion.content} />
          </Typography>
          <QuestionAnswer
            type={currentQuestion.type}
            text={
              <TextAnswer
                value={currentAnswer.answer?.[0] as string}
                onChange={handleTextAnswerChange}
              />
            }
            multichoice={
              <MultichoiceAnswer
                single={isMultichoiceSingle}
                choices={choices.map((content, index) => ({
                  content,
                  checked: currentAnswer.answer?.[index] as boolean
                }))}
                onChange={handleMultichoiceAnswerChange}
              />
            }
            truefalse={
              <TrueFalseAnswer
                value={currentAnswer.answer?.[0] as boolean | undefined}
                onChange={handleMultichoiceAnswerChange}
              />
            }
            matching={
              <MatchingAnswer
                choices={choices.map((content, index) => ({
                  value: content,
                  correct: currentQuestion.answer?.[index].correct as string
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
