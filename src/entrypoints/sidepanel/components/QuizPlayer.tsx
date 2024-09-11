import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Quiz } from '@/models'
import { resetProgress, setTab, toggleRevealAnswers, useProgressStore } from '@/stores/useProgressStore'
import { Eye, EyeOff, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SinglePage } from './SinglePage'
import { Stepper } from './Stepper'

interface Props {
  quiz: Quiz
}

export function QuizPlayer ({ quiz }: Props): JSX.Element {
  const { t } = useTranslation()
  const [closing, setClosing] = useState(false)

  const tab = useProgressStore((state) => state.tab)
  const reveal = useProgressStore((state) => state.revealAnswers)

  const handleClose = (): void => {
    resetProgress()
  }

  return (
    <Card className='p-2'>
      <div className='bg-background p-2 mb-[2px]'>
        <div className='flex justify-between items-start'>
          <div>
            <p className='text-sm text-muted-foreground'>
              {quiz.category}
            </p>
            <h1 className='text-xl font-semibold text-foreground'>
              {quiz.name}
            </h1>
          </div>
          <div className='flex space-x-2'>
            <Button
              size='icon'
              variant='ghost'
              className='hover:bg-border hover:text-primary'
              title={reveal ? t('hide-answers') : t('reveal-answers')}
              aria-label={reveal ? t('hide-answers') : t('reveal-answers')}
              onClick={() => toggleRevealAnswers()}
            >
              {reveal ? <EyeOff /> : <Eye />}
            </Button>
            <Button
              size='icon'
              variant='ghost'
              className='hover:bg-destructive hover:text-destructive-foreground'
              aria-label={t('close')}
              title={t('close')}
              onClick={() => setClosing(true)}
            >
              <X />
            </Button>
          </div>
        </div>
        <ConfirmDialog
          open={closing}
          onCancel={() => setClosing(false)}
          onAccept={() => handleClose()}
          description={t('close-quiz-description')}
          variant='destructive'
        />
      </div>

      <Tabs className='w-full' defaultValue={tab} onValueChange={setTab}>
        <TabsList className='grid grid-cols-2'>
          <TabsTrigger value='stepper'>{t('stepper')}</TabsTrigger>
          <TabsTrigger value='singlepage'>{t('single-page')}</TabsTrigger>
        </TabsList>
        <TabsContent value='stepper' className='mt-4'>
          <Stepper questions={quiz.questions} />
        </TabsContent>
        <TabsContent value='singlepage' className='mt-4'>
          <SinglePage questions={quiz.questions} />
        </TabsContent>
      </Tabs>
    </Card>
  )
}
