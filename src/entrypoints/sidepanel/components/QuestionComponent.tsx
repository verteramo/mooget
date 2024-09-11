import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Question } from '@/models'
import { useProgressStore } from '@/stores/useProgressStore'
import { Fragment } from 'react/jsx-runtime'
import { AnswerComponent } from './AnswerComponent'
import { MultiplechoiceAnswer } from './MultiplechoiceAnswer'
import { TextAnswer } from './TextAnswer'
import { EssayAnswer } from './EssayAnswer'

interface Props {
  index: number
  question: Question
}

export function QuestionComponent ({
  index,
  question: { id, type, content, answers }
}: Props): JSX.Element {
  const revealAnswers = useProgressStore((state) => state.revealAnswers)
  const userAnswerValue = useProgressStore((state) => state.userAnswers[index].value)
  // const isSingle = answers.filter(({ match }) => match as boolean).length === 1
  const isDescription = type === 'description'

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
                <TextAnswer
                  index={index}
                  revealAnswer={revealAnswers}
                  userAnswer={userAnswerValue}
                  questionAnswer={answers}
                />
              }
              essay={
                <EssayAnswer
                  index={index}
                  revealAnswer={revealAnswers}
                  userAnswer={userAnswerValue}
                  questionAnswer={answers}
                />
              }
              multichoice={
                // isSingle
                //   ? <SinglechoiceAnswer
                //       choices={choices}
                //       answer={booleanArrayValue}
                //       onAnswer={() => {}}
                //     />
                <MultiplechoiceAnswer
                  index={index}
                  revealAnswer={revealAnswers}
                  userAnswer={userAnswerValue}
                  questionAnswer={answers}
                />
              }
              // truefalse={
              //   <SinglechoiceAnswer
              //     choices={[t('true'), t('false')]}
              //     answer={booleanArrayValue}
              //     onAnswer={() => {}}
              //   />
              // }
              // matching={
              //   <MatchingAnswer
              //     contents={choices}
              //     matches={matches}
              //     answer={stringArrayValue}
              //     onAnswer={() => {}}
              //   />
              // }
            />
          </CardContent>
        </Fragment>
      )}
    </Card>
  )
}
