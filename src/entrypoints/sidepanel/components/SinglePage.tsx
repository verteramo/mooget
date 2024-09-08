import { Question } from '@/models'
import { useProgressStore } from '@/stores/useProgressStore'
import { QuestionComponent } from './QuestionComponent'
import { SinglePageControls } from './SinglePageControls'

interface Props {
  questions: Question[]
  onAnswer: (index: number, value: any) => void
  onFinish: () => void
}

export function SinglePage ({ questions, onAnswer, onFinish }: Props): JSX.Element {
  const answers = useProgressStore((state) => state.answers)

  const handleAnswer = (index: number) => (value: any): void => {
    onAnswer(index, value)
  }

  return (
    <div className='space-y-4'>
      <SinglePageControls
        onFinish={onFinish}
      />
      {answers.map(({ index: questionIndex }, index) => (
        <QuestionComponent
          key={questions[questionIndex].id}
          question={questions[questionIndex]}
          answer={answers[index]}
          onAnswer={handleAnswer(index)}
        />
      ))}
    </div>
  )
}
