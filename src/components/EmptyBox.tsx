import { Card, CardContent } from '@/components/ui/card'
import { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  title: string
  content: string
}

export default function EmptyBox ({ icon, title, content }: Props): JSX.Element {
  return (
    <Card className='w-full h-full border-4 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'>
      <CardContent className='flex flex-col items-center justify-center h-full p-10 text-center'>
        {icon}
        <h3 className='text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3'>
          {title}
        </h3>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          {content}
        </p>
      </CardContent>
    </Card>
  )
}
