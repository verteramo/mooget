import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

interface Props {
  contents: string[]
  matches: string[]
  onAnswer: (answer: string) => void
}

export function MatchingAnswer ({ contents, matches, onAnswer }: Props): JSX.Element {
  return (
    <div className='grid grid-cols-2 gap-4'>
      {contents.map((content) => (
        <React.Fragment key={content}>
          <div className='flex items-center'>{content}</div>
          <Select onValueChange={onAnswer}>
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
        </React.Fragment>
      ))}
    </div>
  )
};
