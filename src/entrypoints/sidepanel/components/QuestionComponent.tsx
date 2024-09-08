import { LabeledInput } from '@/components/LabeledInput'
import { LabeledTextarea } from '@/components/LabeledTextarea'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Question, UserAnswer } from '@/models'
import { useTranslation } from 'react-i18next'
import { AnswerComponent } from './AnswerComponent'
import { MatchingAnswer } from './MatchingAnswer'
import { MultiplechoiceAnswer } from './MultiplechoiceAnswer'
import { SinglechoiceAnswer } from './SinglechoiceAnswer'
import { Fragment } from 'react/jsx-runtime'

interface Props {
  question: Question
  answer: UserAnswer
  onAnswer: (value: any) => void
}

export function QuestionComponent ({
  question: { id, type, content, answers },
  answer: { value },
  onAnswer
}: Props): JSX.Element {
  const { t } = useTranslation()

  const isDescription = (
    type === 'description'
  )

  const isSingle = (
    answers.filter(({ match }) => match as boolean).length === 1
  )

  const choices = (
    answers.map(({ value }) => value as string)
  )

  const stringValue = (
    (value?.[0] as string) ?? ''
  )

  const booleanArrayValue = (
    value as boolean[]
  )

  const contents = (
    answers.map(({ value }) => value as string)
  )

  const matches = (
    answers.map(({ match }) => match as string)
  )

  const stringArrayValue = (
    value as string[]
  )

  return (
    <Card className='relative mb-4'>
      <CardHeader className={`flex flex-row items-start p-4 space-x-4 bg-slate-50 dark:bg-slate-900 ${isDescription ? 'rounded-xl' : 'rounded-t-xl'}`}>
        <div
          className='flex-grow text-justify overflow-hidden'
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </CardHeader>
      {!isDescription && (
        <Fragment>
          <Separator />
          <CardContent className='p-4'>
            <AnswerComponent
              type={type}
              text={
                <LabeledInput
                  id={id}
                  label={t('answer')}
                  value={stringValue}
                  onChange={onAnswer}
                />
              }
              essay={
                <LabeledTextarea
                  id={id}
                  label={t('answer')}
                  value={stringValue}
                  onChange={onAnswer}
                />
              }
              multichoice={
                isSingle
                  ? <SinglechoiceAnswer
                      choices={choices}
                      answer={booleanArrayValue}
                      onAnswer={onAnswer}
                    />
                  : <MultiplechoiceAnswer
                      choices={choices}
                      answer={booleanArrayValue}
                      onAnswer={onAnswer}
                    />
              }
              truefalse={
                <SinglechoiceAnswer
                  choices={[t('true'), t('false')]}
                  answer={booleanArrayValue}
                  onAnswer={onAnswer}
                />
              }
              matching={
                <MatchingAnswer
                  contents={contents}
                  matches={matches}
                  answer={stringArrayValue}
                  onAnswer={onAnswer}
                />
              }
            />
          </CardContent>
        </Fragment>
      )}
    </Card>
  )
}
