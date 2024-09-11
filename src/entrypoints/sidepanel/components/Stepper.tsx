import { Button } from '@/components/ui/button'
import { Question } from '@/models'
import { back, next, useProgressStore } from '@/stores/useProgressStore'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { QuestionComponent } from './QuestionComponent'

interface Props {
  questions: Question[]
}

export function Stepper ({ questions }: Props): JSX.Element {
  const { t } = useTranslation()

  const step = useProgressStore((state) => state.step)
  const answers = useProgressStore((state) => state.userAnswers)

  const currentStep = step + 1
  const isFirstStep = step === 0
  const isLastStep = step === questions.length - 1

  const index = answers[step].index

  return (
    <div className='space-y-4'>

      <div className='flex justify-between items-center'>
        <Button
          size='icon'
          variant='outline'
          aria-label={t('back')}
          title={t('back')}
          onClick={back}
          disabled={isFirstStep}
        >
          <ChevronLeft />
        </Button>
        <div className='font-medium'>
          {currentStep} / {questions.length}
        </div>
        <Button
          size='icon'
          variant='outline'
          aria-label={t('next')}
          title={t('next')}
          onClick={next}
          disabled={isLastStep}
        >
          <ChevronRight />
        </Button>
      </div>

      <QuestionComponent index={index} question={questions[index]} />

    </div>
  )
}
