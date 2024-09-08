import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface Props {
  choices: string[]
  answer: boolean[]
  onAnswer: (value: boolean[]) => void
}

export function SinglechoiceAnswer ({ choices, answer, onAnswer }: Props): JSX.Element {
  const handleValueChange = (value: string): void => {
    onAnswer(
      answer.map((_, index) => {
        const uniqueKey = `${choices[index]}-${index}`
        return value === uniqueKey
      })
    )
  }

  return (
    <RadioGroup onValueChange={handleValueChange}>
      {choices.map((choice, index) => {
        const uniqueKey = `${choice}-${index}`
        return (
          <div key={uniqueKey} className='flex items-center space-x-2'>
            <div className='flex-col'>
              <RadioGroupItem
                id={uniqueKey}
                value={uniqueKey}
                checked={answer[index] ?? false}
              />
            </div>
            <Label
              className='font-normal text-justify'
              htmlFor={uniqueKey}
              dangerouslySetInnerHTML={{ __html: choice }}
            />
          </div>
        )
      })}
    </RadioGroup>
  )
}
