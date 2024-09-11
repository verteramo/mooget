import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { QuestionAnswer } from '@/models'
import { setAnswer } from '@/stores/useProgressStore'
import { useTranslation } from 'react-i18next'
import { Fragment } from 'react/jsx-runtime'

interface Props {
  index: number
  revealAnswer: boolean
  userAnswer: Array<string | boolean>
  questionAnswer: QuestionAnswer[]
}

export function EssayAnswer ({
  index,
  revealAnswer,
  userAnswer,
  questionAnswer
}: Props): JSX.Element {
  const { t } = useTranslation()

  const id = `answer-${index}`

  const userAnswerValue = userAnswer.pop() as string
  const questionAnswerValue = questionAnswer[0]?.value as string

  const handleChange = (value: string): void => {
    setAnswer(index, [value])
  }

  return (
    <Fragment>
      <div className='space-y-2'>
        <Label htmlFor={id}>{t('answer')}</Label>
        <Textarea
          id={id}
          value={userAnswerValue}
          onChange={({ target: { value } }) => handleChange(value)}
          className='w-full'
        />
      </div>
      {revealAnswer && (
        <div className='mt-2 p-2 bg-green-100 dark:bg-green-900 rounded-md'>
          <p className='text-sm font-medium text-green-700 dark:text-green-300'>
            {t('correct-answer')}: {questionAnswerValue}
          </p>
        </div>
      )}
    </Fragment>
  )
}
