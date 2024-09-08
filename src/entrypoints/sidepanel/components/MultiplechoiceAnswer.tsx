import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  choices: string[]
  answer: boolean[]
  onAnswer: (value: boolean[]) => void
}

export function MultiplechoiceAnswer ({ choices, answer, onAnswer }: Props): JSX.Element {
  const handleCheckedChange = (index: number) => (): void => {
    onAnswer(answer.map((current, i) => (i === index ? !current : current)))
  }

  return (
    <div className='space-y-2'>
      {choices.map((choice, index) => {
        const uniqueKey = `${choice}-${index}`
        return (
          <div key={uniqueKey} className='flex items-center space-x-2'>
            <div className='flex-col'>
              <Checkbox
                id={uniqueKey}
                checked={answer[index] ?? false}
                onCheckedChange={handleCheckedChange(index)}
              />
            </div>
            <label
              className='text-justify'
              htmlFor={uniqueKey}
              dangerouslySetInnerHTML={{ __html: choice }}
            />
          </div>
        )
      })}
    </div>
  )
}
