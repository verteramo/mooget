import UndefinedIcon from '@/assets/undefined-icon.png'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Quiz } from '@/models'
import { useTranslation } from 'react-i18next'

interface Props {
  quiz: Quiz
  onSave: (quiz: Quiz) => void
}

export function QuizCard ({ quiz: initialState, onSave }: Props): JSX.Element {
  const { t } = useTranslation()
  const [quiz, setQuiz] = useState(initialState)

  return (
    <Card className='mb-2 rounded-sm'>
      <div className='flex'>
        <div className='flex-grow p-2'>
          <CardTitle className='text-sm font-medium mb-4 ml-2 text-muted-foreground'>
            {quiz.owner}
          </CardTitle>
          <div className='flex space-x-2 mb-2'>
            <div className='flex-1'>
              <div className='relative'>
                <Label
                  htmlFor='category'
                  className='absolute -top-2 left-2 px-1 bg-background text-[8px] text-muted-foreground uppercase tracking-widest'
                >
                  {t('category')}
                </Label>
                <Input
                  id='category'
                  className='h-7 text-xs pt-1'
                  value={quiz.category}
                  onChange={
                    ({ target: { value } }) =>
                      setQuiz({ ...quiz, category: value })
                  }
                />
              </div>
            </div>
            <div className='flex-1'>
              <div className='relative'>
                <Label
                  htmlFor='name'
                  className='absolute -top-2 left-2 px-1 bg-background text-[8px] text-muted-foreground uppercase tracking-widest'
                >
                  {t('name')}
                </Label>
                <Input
                  id='name'
                  className='h-7 text-xs pt-1'
                  value={quiz.name}
                  onChange={
                    ({ target: { value } }) =>
                      setQuiz({ ...quiz, name: value })
                  }
                />
              </div>
            </div>
          </div>
          <Button className='h-7 text-xs' onClick={() => onSave(quiz)}>
            {t('save')}
          </Button>
        </div>
        <div className='w-24 bg-white overflow-hidden rounded-tr-lg rounded-br-lg'>
          <img
            src={quiz.icon ?? UndefinedIcon}
            alt={quiz.owner}
            title={quiz.owner}
            className='w-full h-full object-contain'
          />
        </div>
      </div>
    </Card>
  )
}
