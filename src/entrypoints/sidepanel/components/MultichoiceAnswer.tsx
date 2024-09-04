import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface Props {
  single: boolean
  choices: Array<{
    content: string
    checked: boolean
  }>
  onAnswer: (answer: string) => void
}

export function MultichoiceAnswer ({ single, choices, onAnswer }: Props): JSX.Element {
  if (single) {
    return (
      <RadioGroup onValueChange={onAnswer}>
        {choices.map(({ content, checked }) => (
          <div key={content} className='flex items-center space-x-2'>
            <RadioGroupItem value={content} id={content} checked={checked} />
            <Label htmlFor={content}>{content}</Label>
          </div>
        ))}
      </RadioGroup>
    )
  }

  return (
    <div className='space-y-2'>
      {choices.map(({ content, checked }) => (
        <div key={content} className='flex items-center space-x-2'>
          <Checkbox
            checked={checked}
            onCheckedChange={() => onAnswer(content)}
          />
          <label htmlFor={content}>{content}</label>
        </div>
      ))}
    </div>
  )
}
