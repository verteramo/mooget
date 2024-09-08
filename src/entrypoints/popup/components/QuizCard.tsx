import UndefinedIcon from '@/assets/undefined-icon.png'
import { LabeledInput } from '@/components/LabeledInput'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { Quiz } from '@/models'
import { FileQuestion } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Props {
  quiz: Quiz
  onSave: (quiz: Quiz) => void
}

export function QuizCard ({ quiz: initialState, onSave }: Props): JSX.Element {
  const { t } = useTranslation()
  const [quiz, setQuiz] = useState(initialState)

  const setCategory = (category: string): void => {
    setQuiz({ ...quiz, category })
  }

  const setName = (name: string): void => {
    setQuiz({ ...quiz, name })
  }

  const handleSave = (quiz: Quiz) => (): void => {
    onSave(quiz)
  }

  return (
    <Card className='flex rounded-sm mb-2'>
      <div className='flex-grow p-2'>
        <div className='flex justify-between items-center mb-2'>
          <CardTitle className='text-xs font-medium ml-2 text-muted-foreground'>
            {quiz.owner}
          </CardTitle>
          <Badge variant='secondary' className='flex items-center gap-1'>
            <FileQuestion className='w-3 h-3' />
            <span>
              {t('questions-count', { count: quiz.questions.length })}
            </span>
          </Badge>
        </div>
        <div className='flex space-x-2 mb-2'>
          <LabeledInput
            className='text-xs h-7 pt-1'
            id='category'
            label={t('category')}
            value={quiz.category}
            onChange={setCategory}
          />
          <LabeledInput
            className='text-xs h-7 pt-1'
            id='name'
            label={t('name')}
            value={quiz.name}
            onChange={setName}
          />
        </div>
        <div className='flex space-x-2'>
          <Button size='sm' onClick={handleSave(quiz)}>
            {t('save')}
          </Button>
        </div>
      </div>
      <div className='w-24 bg-white overflow-hidden rounded-tr-lg rounded-br-lg'>
        <img
          alt={quiz.owner}
          src={quiz.icon ?? UndefinedIcon}
          className='w-full h-full object-contain'
        />
      </div>
    </Card>
  )
}
