import { Card, CardContent } from '@/components/ui/card'
import { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  title: string
  content: string
}

export function EmptyBox ({ icon, title, content }: Props): JSX.Element {
  return (
    <Card className='flex-1 border-4 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'>
      <CardContent className='flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 text-center'>
        {icon}
        <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-3'>
          {title}
        </h3>
        <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
          {content}
        </p>
      </CardContent>
    </Card>
  )
}
