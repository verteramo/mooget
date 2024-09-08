import { Button } from '@/components/ui/button'
import { t } from 'i18next'
import { CheckCircle } from 'lucide-react'

interface Props {
  onFinish: () => void
}

export function SinglePageControls ({ onFinish }: Props): JSX.Element {
  return (
    <div className='flex justify-end items-center'>
      <Button
        variant='outline'
        aria-label={t('finish')}
        onClick={onFinish}
      >
        <CheckCircle className='h-4 w-4 mr-2' />
        {t('finish')}
      </Button>
    </div>
  )
}
