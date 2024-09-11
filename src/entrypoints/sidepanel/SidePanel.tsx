import { EmptyBox } from '@/components/EmptyBox'
import { Topbar } from '@/components/Topbar'
import { useConfigStore } from '@/stores/useConfigStore'
import { useProgressStore } from '@/stores/useProgressStore'
import { useQuizStore } from '@/stores/useQuizStore'
import { Atom } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Fragment } from 'react/jsx-runtime'
import { QuizPlayer } from './components/QuizPlayer'

function SidePanel (): JSX.Element {
  const { t } = useTranslation()

  const mode = useConfigStore((state) => state.mode)

  const list = useQuizStore((state) => state.list)
  const quizId = useProgressStore((state) => state.quizId)

  const quiz = useMemo(
    () => list.find(({ id }) => id === quizId), [list, quizId]
  )

  const showQuizPlayer = (
    quiz !== undefined
  )

  return (
    <Fragment>
      <Topbar />
      <div className={`${mode} min-h-screen h-full bg-background text-foreground p-2`}>
        {showQuizPlayer
          ? <QuizPlayer quiz={quiz} />
          : <EmptyBox
            icon={<Atom className='w-12 h-12 text-gray-400 mb-4' />}
            title={t('empty-quiz')}
            content={t('empty-quiz-description')}
            />}
      </div>
    </Fragment>
  )
}

render(<SidePanel />)
