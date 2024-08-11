/** External dependencies */
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import {
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material'

/** Package dependencies */
import { EmptyBox } from '../common/EmptyBox'
import { RawContent } from '../common/RawContent'
import { render } from '../common/render'
import { QuestionAnswer } from './components/QuestionAnswer'
import { QuizStepper } from './components/QuizStepper'

/** Project dependencies */
import { Question } from '@/core/models/Question'
import { Quiz } from '@/core/models/Quiz'
import { Store } from '@/core/models/Store'
import { sliceProgressSetAnswer, sliceProgressSetStep } from '@/redux/sliceProgress'
import { MultichoiceAnswer } from './components/MultichoiceAnswer'
import { TextAnswer } from './components/TextAnswer'

function SidePanel (): JSX.Element {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const progress = useSelector((store: Store) => store.progress)
  const quizzes = useSelector((store: Store) => store.quizzes)
  const quiz = quizzes.find(({ id }) => id === progress.quiz)

  const handleBackClick = (): void => {
    dispatch(sliceProgressSetStep(progress.step - 1))
  }

  const handleNextClick = (): void => {
    dispatch(sliceProgressSetStep(progress.step + 1))
  }

  const handleFinished = (): void => {
    console.log('finished')
  }

  const currentAnswer = progress.answers[progress.step]

  function currentQuestion (quiz: Quiz): Question {
    return quiz.questions[currentAnswer.index]
  }

  const handleTextAnswerChange = (value: string): void => {
    dispatch(sliceProgressSetAnswer({
      ...currentAnswer,
      answer: [value]
    }))

    console.log('progress', progress)
  }

  const isMultichoiceSingle = (quiz: Quiz): boolean => {
    return currentQuestion(quiz).answer?.filter(({ correct }) => correct === true).length === 1
  }

  const contents = (quiz: Quiz): string[] => {
    return quiz.questions[currentAnswer.index].answer?.map(({ value }) => value) as string[]
  }

  return quiz !== undefined
    ? (
      <Paper elevation={2}>
        <Stack divider={<Divider variant='middle' />}>
          <Typography sx={{ p: 2 }} variant='h6'>
            {quiz.name}
          </Typography>
          <Stack p={2} spacing={2}>
            <QuizStepper
              steps={quiz.questions.length}
              current={progress.step}
              onFinished={handleFinished}
              onBackClick={handleBackClick}
              onNextClick={handleNextClick}
            />
            <Typography align='justify'>
              <RawContent content={currentQuestion(quiz).content} />
            </Typography>
            <QuestionAnswer
              type={currentQuestion(quiz).type}
              text={
                <TextAnswer
                  value={currentAnswer.answer?.[0] as string}
                  onChange={handleTextAnswerChange}
                />
              }
              multichoice={
                <MultichoiceAnswer
                  single={isMultichoiceSingle(quiz)}
                  contents={contents(quiz)}
                />
              }
            />
          </Stack>
        </Stack>
      </Paper>
      )
    : (
      <EmptyBox>{t('empty-quiz')}</EmptyBox>
      )
}

render(<SidePanel />)
