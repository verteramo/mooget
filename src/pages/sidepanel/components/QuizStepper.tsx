import { ArrowBack, ArrowForward, Done } from '@mui/icons-material'
import { Button, MobileStepper } from '@mui/material'

interface Props {
  steps: number
  current: number
  onFinished: () => void
  onBackClick: () => void
  onNextClick: () => void
}

export function QuizStepper ({ steps, current, onFinished, onBackClick, onNextClick }: Props): JSX.Element {
  return (
    <MobileStepper
      variant='text'
      position='static'
      steps={steps}
      activeStep={current}
      backButton={
        <Button size='small' disabled={current === 0} onClick={onBackClick}>
          <ArrowBack />
        </Button>
      }
      nextButton={
        current === steps - 1
          ? (
            <Button size='small' onClick={onFinished}>
              <Done />
            </Button>
            )
          : (
            <Button size='small' onClick={onNextClick}>
              <ArrowForward />
            </Button>
            )
      }
    />
  )
}
