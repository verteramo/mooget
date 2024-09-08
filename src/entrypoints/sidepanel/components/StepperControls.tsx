import { Button } from '@/components/ui/button'
import { t } from 'i18next'
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  step: number
  size: number
  onBack: () => void
  onNext: () => void
  onFinish: () => void
}

export function StepperControls ({ step, size, onBack, onNext, onFinish }: Props): JSX.Element {
  const currentStep = step + 1
  const isFirstStep = step === 0
  const isLastStep = step === size - 1

  return (
    <div className='flex justify-between items-center'>
      <Button
        variant='outline'
        aria-label={t('back')}
        onClick={onBack}
        disabled={isFirstStep}
      >
        <ChevronLeft className='h-4 w-4 mr-2' />
        {t('back')}
      </Button>
      <div className='font-medium'>
        {currentStep} / {size}
      </div>
      {!isLastStep
        ? (
          <Button
            variant='outline'
            aria-label={t('next')}
            onClick={onNext}
          >
            <ChevronRight className='h-4 w-4 mr-2' />
            {t('next')}
          </Button>
          )
        : (
          <Button
            variant='outline'
            aria-label={t('finish')}
            onClick={onFinish}
          >
            <CheckCircle className='h-4 w-4 mr-2' />
            {t('finish')}
          </Button>
          )}
    </div>
  )
}
