import { Question } from '@/models'
import { useProgressStore } from '@/stores/useProgressStore'
import { QuestionComponent } from './QuestionComponent'

interface Props {
  questions: Question[]
}

export function SinglePage ({ questions }: Props): JSX.Element {
  const answers = useProgressStore((state) => state.userAnswers)

  return (
    <div className='space-y-4'>
      {answers.map(({ index: questionIndex }, index) => (
        <QuestionComponent
          index={index}
          key={questions[questionIndex].id}
          question={questions[questionIndex]}
        />
      ))}
    </div>
  )
}
