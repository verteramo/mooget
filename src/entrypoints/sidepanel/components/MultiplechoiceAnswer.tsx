import { Checkbox } from '@/components/ui/checkbox'
import { QuestionAnswer } from '@/models'
import { setAnswer } from '@/stores/useProgressStore'

interface Props {
  index: number
  revealAnswer: boolean
  userAnswer: Array<string | boolean>
  questionAnswer: QuestionAnswer[]
}

export function MultiplechoiceAnswer ({
  index,
  revealAnswer,
  userAnswer,
  questionAnswer
}: Props): JSX.Element {
  const id = `answer-${index}`

  const choices = questionAnswer.map(({ value }) => value as string)
  const userAnswerValue = userAnswer as boolean[]
  const questionAnswerValue = questionAnswer.map(({ match }) => match as boolean)

  const handleCheckedChange = (position: number) => (): void => {
    setAnswer(index, userAnswerValue.map((value, i) => (i === position ? !value : value)))
  }

  return (
    <div className='space-y-2'>
      {choices.map((choice, position) => {
        const key = `${id}-${position}`
        const isCorrect = userAnswerValue[position] !== questionAnswerValue[position]

        return (
          <div key={key} className='flex items-center space-x-2'>
            <div className='flex-col'>
              <Checkbox
                id={key}
                checked={userAnswerValue[position]}
                onCheckedChange={handleCheckedChange(position)}
              />
            </div>
            <label
              className={`text-justify ${revealAnswer && isCorrect ? 'p-2 rounded-sm bg-green-100 dark:bg-green-900' : ''}`}
              htmlFor={key}
              dangerouslySetInnerHTML={{ __html: choice }}
            />
          </div>
        )
      })}
    </div>
  )
}
