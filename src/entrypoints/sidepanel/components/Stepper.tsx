import { Question } from '@/models'
import { back, next, useProgressStore } from '@/stores/useProgressStore'
import { QuestionComponent } from './QuestionComponent'
import { StepperControls } from './StepperControls'

interface Props {
  questions: Question[]
  onAnswer: (index: number, value: any) => void
  onFinish: () => void
}

export function Stepper ({ questions, onAnswer, onFinish }: Props): JSX.Element {
  const index = useProgressStore((state) => state.index)
  const answers = useProgressStore((state) => state.answers)

  const handleAnswer = (value: any): void => {
    onAnswer(index, value)
  }

  return (
    <div className='space-y-4'>
      <StepperControls
        step={index}
        size={questions.length}
        onBack={back}
        onNext={next}
        onFinish={onFinish}
      />
      <QuestionComponent
        question={questions[answers[index].index]}
        answer={answers[index]}
        onAnswer={handleAnswer}
      />
    </div>
  )
}
