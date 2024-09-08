import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Fragment } from 'react'

interface Props {
  contents: string[]
  matches: string[]
  answer: string[]
  onAnswer: (answer: string[]) => void
}

export function MatchingAnswer ({ contents, matches, answer, onAnswer }: Props): JSX.Element {
  const handleValueChange = (index: number) => (value: string): void => {
    onAnswer(
      answer.map((_, i) => {
        return i === index ? value : answer[i]
      })
    )
  }

  return (
    <div className='grid grid-cols-2 gap-4'>
      {contents.map((content, index) => (
        <Fragment key={content}>
          <div className='flex items-center'>{content}</div>
          <Select value={answer[index]} onValueChange={handleValueChange(index)}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Selecciona una opción' />
            </SelectTrigger>
            <SelectContent>
              {matches.map((match) => (
                <SelectItem key={match} value={match}>
                  {match}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Fragment>
      ))}
    </div>
  )
};
