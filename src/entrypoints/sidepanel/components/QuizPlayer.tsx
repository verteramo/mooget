import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Quiz } from '@/models'
import { setAnswer, setTab, useProgressStore } from '@/stores/useProgressStore'
import { t } from 'i18next'
import { QuizPlayerHeader } from './QuizPlayerHeader'
import { SinglePage } from './SinglePage'
import { Stepper } from './Stepper'
import { getSolution } from '@/stores/useQuizStore'

interface Props {
  quiz: Quiz
}

export function QuizPlayer ({ quiz }: Props): JSX.Element {
  const { tab, answers } = useProgressStore((state) => state)

  const handleFinish = (): void => {
    console.log('solution', getSolution(quiz))
    console.log('finish', answers)
  }

  const handleAnswer = (index: number, value: any): void => {
    setAnswer(index, Array.isArray(value) ? value : [value])
  }

  return (
    <Card className='p-3'>
      <QuizPlayerHeader quiz={quiz} />
      <Tabs className='w-full' defaultValue={tab} onValueChange={setTab}>
        <TabsList className='grid grid-cols-2'>
          <TabsTrigger value='stepper'>{t('stepper')}</TabsTrigger>
          <TabsTrigger value='singlepage'>{t('single-page')}</TabsTrigger>
        </TabsList>
        <TabsContent value='stepper' className='mt-4'>
          <Stepper
            questions={quiz.questions}
            onAnswer={handleAnswer}
            onFinish={handleFinish}
          />
        </TabsContent>
        <TabsContent value='singlepage' className='mt-4'>
          <SinglePage
            questions={quiz.questions}
            onAnswer={handleAnswer}
            onFinish={handleFinish}
          />
        </TabsContent>
      </Tabs>
    </Card>
  )
}
