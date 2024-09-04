import { ConfirmDialog } from '@/components/ConfirmDialog'
import { TopBar } from '@/components/TopBar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import configStore from '@/stores/configStore'
import progressStore, { back, cancelProgress, next, setAnswer, setTab } from '@/stores/progressStore'
import quizStore from '@/stores/quizStore'
import { CheckCircle, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSnapshot } from 'valtio'
import { AnswerComponent } from './components/AnswerComponent'
import { TextAnswer } from './components/TextAnswer'

function SidePanel (): JSX.Element {
  const { t } = useTranslation()
  const [closing, setClosing] = useState(false)

  const { mode } = useSnapshot(configStore)
  const { list } = useSnapshot(quizStore)
  const { quizId, step, tab, answers } = useSnapshot(progressStore)

  const quiz = useMemo(
    () => list.find(({ id }) => id === quizId), [list, quizId]
  )

  if (quiz === undefined) {
    return (
      <div className={`h-screen bg-background text-foreground ${mode}`}>
        <p>{t('empty-quiz')}</p>
      </div>
    )
  }

  const question = quiz.questions[step]
  const answer = answers[step]

  const handleFinish = (): void => {
    console.log('Finish')
  }

  return (
    <div className={`h-screen bg-background text-foreground ${mode}`}>
      <TopBar />

      <div className='container mx-auto p-2'>
        <Button
          size='icon'
          variant='outline'
          aria-label={t('close')}
          onClick={() => setClosing(true)}
          className='float-right'
        >
          <X className='h-4 w-4' />
        </Button>
        <ConfirmDialog
          open={closing}
          onCancel={() => setClosing(false)}
          onAccept={() => cancelProgress()}
          description={t('close-quiz-description')}
          variant='warning'
        />
        <h1 className='text-2xl font-bold mb-2'>{quiz.category}</h1>
        <h2 className='text-xl font-semibold mb-4'>{quiz.name}</h2>
        <Tabs className='w-full' defaultValue={tab} onValueChange={setTab}>
          <TabsList className='grid grid-cols-2'>
            <TabsTrigger value='stepper'>{t('sequential')}</TabsTrigger>
            <TabsTrigger value='spa'>{t('complete')}</TabsTrigger>
          </TabsList>
          <TabsContent value='stepper' className='mt-4'>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <Button
                  size='icon'
                  variant='outline'
                  aria-label={t('back')}
                  onClick={back}
                  disabled={step === 0}
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <div className='text-sm font-medium'>
                  {step + 1} / {quiz.questions.length}
                </div>
                {step < quiz.questions.length - 1
                  ? (
                    <Button
                      size='icon'
                      variant='outline'
                      aria-label={t('next')}
                      onClick={next}
                    >
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                    )
                  : (
                    <Button
                      size='icon'
                      variant='outline'
                      aria-label={t('finish')}
                      onClick={handleFinish}
                    >
                      <CheckCircle className='h-4 w-4' />
                    </Button>
                    )}
              </div>
              <div className='space-y-4'>
                <div
                  className='text-lg font-medium mb-4 p-4 bg-muted rounded-lg'
                  dangerouslySetInnerHTML={{
                    __html: question.content
                  }}
                />
                <AnswerComponent
                  type={question.type}
                  text={
                    <TextAnswer
                      value={answer.value?.[0] as string ?? ''}
                      onAnswer={(value) => setAnswer(answer.index, [value])}
                    />
                  }
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value='spa' className='mt-4'>
            {/* <div className='space-y-8'>
                      {questions.map((question) => (
                        <div key={question.id} className='border-b pb-4 last:border-b-0'>
                          <QuestionComponent
                            question={question}
                            onAnswer={(answer) => handleAnswer(question.id, answer)}
                          />
                        </div>
                      ))}
                      <Button onClick={handleFinish} className='w-full'>
                        Finalizar cuestionario
                      </Button>
                    </div> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

render(<SidePanel />)
