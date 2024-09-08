import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Quiz } from '@/models'
import { resetProgress } from '@/stores/useProgressStore'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Fragment } from 'react/jsx-runtime'

interface Props {
  quiz: Quiz
}

export function QuizPlayerHeader ({ quiz: { category, name } }: Props): JSX.Element {
  const { t } = useTranslation()
  const [closing, setClosing] = useState(false)

  return (
    <Fragment>
      <Button
        size='icon'
        variant='destructive'
        aria-label={t('close')}
        onClick={() => setClosing(true)}
        className='float-right'
      >
        <X className='h-4 w-4' />
      </Button>
      <ConfirmDialog
        open={closing}
        onCancel={() => setClosing(false)}
        onAccept={() => resetProgress()}
        description={t('close-quiz-description')}
        variant='destructive'
      />
      <h1 className='text-2xl font-bold mb-2'>{category}</h1>
      <h2 className='text-xl font-semibold mb-4'>{name}</h2>
    </Fragment>
  )
}
